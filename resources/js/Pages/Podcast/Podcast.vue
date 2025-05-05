<script setup lang="ts">
import EpisodeCard from '@/Components/Podcast/EpisodeCard.vue'
import PodcastBody from '@/Components/Podcast/Podcast/PodcastBody.vue'
import PodcastHeader from '@/Components/Podcast/Podcast/PodcastHeader.vue'
import Podcast from '@/Interfaces/Podcast'
import PodcastEpisode from '@/Interfaces/PodcastEpisode'
import MainLayout from '@/Layouts/MainLayout.vue'
import episodes from '@/routes/podcast/episodes/all/api'
import { Head } from '@inertiajs/vue3'
import axios from 'axios'
import { computed, onMounted, ref, type PropType } from 'vue'

const props = defineProps({
    podcast: {
        type: Object as PropType<Podcast>,
        required: true,
    },
    initialEpisodes: {
        type: Array as PropType<PodcastEpisode[]>,
        required: true,
    },
    totalEpisodesHint: {
        // Initial estimate/hint
        type: Number,
        required: true,
    },
    episodesPerPage: {
        type: Number,
        required: true,
    },
    pageInfo: {
        type: Object,
        required: true,
    },
})

defineOptions({
    layout: MainLayout,
})

// Holds ALL episodes (initial + fetched)
const allEpisodes = ref<PodcastEpisode[]>([...props.initialEpisodes])
// Tracks how many episodes from 'allEpisodes' should be rendered
const displayedEpisodesCount = ref(props.initialEpisodes.length)
// Loading state for the background fetch
const isLoadingAll = ref(false)
// Loading state for the "See More" button action (visual feedback)
const isShowingMore = ref(false)
// Flag to indicate if the background fetch has completed (or failed)
const hasFetchedAll = ref(props.initialEpisodes.length >= props.totalEpisodesHint) // Assume fetched if initial >= hint
// Store the potentially updated total count after fetching all
const totalEpisodes = ref(props.totalEpisodesHint)

// Computed property for the episodes to actually render in the template
const displayedEpisodes = computed(() => {
    // Slice the main array based on the display count
    return allEpisodes.value.slice(0, displayedEpisodesCount.value)
})

// Computed property to determine if the "See More" button should be shown
const canLoadMore = computed(() => {
    // Show if we have fetched all AND there are more episodes to display than currently shown
    return hasFetchedAll.value && displayedEpisodesCount.value < totalEpisodes.value
})

// Function to fetch ALL remaining episodes in the background
async function fetchRemainingEpisodesInBackground() {
    // Don't fetch if we already know we have them all or if already loading
    if (hasFetchedAll.value || isLoadingAll.value) return

    isLoadingAll.value = true
    try {
        const response = await axios.get(episodes.url(props.podcast.id))

        const fetchedEpisodes = response.data.episodes as PodcastEpisode[]
        const actualTotal = response.data.totalEpisodes as number

        // Update the main list with ALL episodes (replace initial ones if they overlap, simple concat might duplicate)
        // A more robust way is to create a Set from IDs of initialEpisodes, then filter fetchedEpisodes
        const initialIds = new Set(props.initialEpisodes.map(ep => ep.id))
        const remainingEpisodes = fetchedEpisodes.filter(ep => !initialIds.has(ep.id))

        allEpisodes.value = [...props.initialEpisodes, ...remainingEpisodes]
        totalEpisodes.value = actualTotal // Update total count
        hasFetchedAll.value = true // Mark as fetched
    } catch (error) {
        console.error('Failed to fetch all episodes:', error)
        // Optionally set a flag to prevent retries or show an error message
        hasFetchedAll.value = true // Set true even on error to stop trying/hide loader maybe
    } finally {
        isLoadingAll.value = false
    }
}

// Function called when "See More" is clicked
function showMoreEpisodes() {
    if (!canLoadMore.value) return

    isShowingMore.value = true // Indicate loading for the button action

    // Calculate the new count
    const newCount = Math.min(
        displayedEpisodesCount.value + props.episodesPerPage,
        totalEpisodes.value, // Don't exceed the total number available
    )
    displayedEpisodesCount.value = newCount

    // Simulate a small delay for visual feedback if needed, otherwise remove setTimeout
    setTimeout(() => {
        isShowingMore.value = false
    }, 100) // Adjust delay as needed or remove
}

// Fetch remaining episodes when the component mounts if needed
onMounted(() => {
    // Only trigger background fetch if initial load count is less than the hint
    // or if the hint itself suggests more than the per-page count
    if (
        props.initialEpisodes.length < props.totalEpisodesHint ||
        props.totalEpisodesHint > props.episodesPerPage
    ) {
        fetchRemainingEpisodesInBackground()
    } else {
        // If initial episodes >= hint, assume we already have all needed
        hasFetchedAll.value = true
    }
})

// --- Helper function to format duration (example) ---
function formatDuration(seconds: number): string {
    if (!seconds || seconds <= 0) return 'N/A'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    const hStr = h > 0 ? `${h}:` : ''
    const mStr = m < 10 ? `0${m}` : `${m}`
    const sStr = s < 10 ? `0${s}` : `${s}`
    return `${hStr}${mStr}:${sStr}`
}
// --- End Helper ---
</script>

<template>
    <Head :title="pageInfo.title" />

    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative mb-6 flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <PodcastHeader :podcastName="podcast.title" :podcastFavicon="podcast.image" />
            <PodcastBody :podcast="podcast" />
        </div>

        <!-- Episode List - iterates over computed 'displayedEpisodes' -->
        <div class="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
            <EpisodeCard
                v-for="episode in displayedEpisodes"
                :key="episode.id"
                :title="episode.title"
                :date="
                    episode.datePublishedPretty ||
                    new Date(episode.datePublished * 1000).toLocaleDateString()
                "
                :description="episode.description"
                :duration="formatDuration(episode.duration)"
                :isPlaying="false"
                :progress="70"
                @toggle-play="
                    () => {
                        /* Implement play logic */
                    }
                "
            />
        </div>

        <!-- Loading Indicator for the background fetch -->
        <div v-if="isLoadingAll" class="mt-4 text-center text-gray-500 dark:text-gray-400">
            Loading remaining episodes...
        </div>

        <!-- See More Button -->
        <!-- Show button only if 'canLoadMore' is true and not currently showing more -->
        <div v-if="canLoadMore && !isShowingMore" class="mt-4 flex justify-center">
            <button
                @click="showMoreEpisodes"
                class="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
                See More Episodes ({{ displayedEpisodesCount }} / {{ totalEpisodes }})
            </button>
        </div>
        <!-- Loading indicator specifically for the "See More" action -->
        <div v-if="isShowingMore" class="mt-4 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>

        <!-- Message when all are displayed -->
        <div
            v-if="hasFetchedAll && displayedEpisodesCount >= totalEpisodes && totalEpisodes > 0"
            class="mt-4 text-center text-gray-500 dark:text-gray-400"
        >
            All episodes shown.
        </div>

        <!-- Message when no episodes found initially -->
        <div
            v-if="allEpisodes.length === 0 && !isLoadingAll"
            class="mt-4 text-center text-gray-500 dark:text-gray-400"
        >
            No episodes found for this podcast.
        </div>
    </div>
</template>
