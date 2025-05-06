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

const allEpisodes = ref<PodcastEpisode[]>([...props.initialEpisodes])
const displayedEpisodesCount = ref(props.initialEpisodes.length)
const isShowingMore = ref(false)
const hasFetchedAll = ref(props.initialEpisodes.length >= props.totalEpisodesHint) // Assume fetched if initial >= hint
const totalEpisodes = ref(props.totalEpisodesHint)

// Computed property for the episodes to actually render in the template
const displayedEpisodes = computed(() => {
    // Slice the main array based on the display count
    return allEpisodes.value.slice(0, displayedEpisodesCount.value)
})

// Computed property to determine if the "See More" button should be shown
const canLoadMore = computed(() => {
    // Show button if we haven't fetched all OR if we have fetched all but haven't displayed all
    return !hasFetchedAll.value || displayedEpisodesCount.value < totalEpisodes.value
})

async function fetchRemainingEpisodes() {
    if (hasFetchedAll.value) return

    try {
        const response = await axios.get(episodes.url(props.podcast.id))

        const fetchedEpisodes = response.data.episodes as PodcastEpisode[]
        const actualTotal = response.data.totalEpisodes as number

        const initialIds = new Set(props.initialEpisodes.map(ep => ep.id))
        const remainingEpisodes = fetchedEpisodes.filter(ep => !initialIds.has(ep.id))

        allEpisodes.value = [...props.initialEpisodes, ...remainingEpisodes]
        totalEpisodes.value = actualTotal
        hasFetchedAll.value = true
    } catch (error) {
        console.error('Failed to fetch all episodes:', error)
        hasFetchedAll.value = true
    }
}

// Function called when "See More" is clicked
async function showMoreEpisodes() {
    // Prevent clicking if already loading or if all known episodes are shown
    if (
        isShowingMore.value ||
        (hasFetchedAll.value && displayedEpisodesCount.value >= totalEpisodes.value)
    ) {
        return
    }

    isShowingMore.value = true

    try {
        if (!hasFetchedAll.value) {
            await fetchRemainingEpisodes()
        }

        // If fetch was successful (or already done), update displayed count
        // This happens even if fetch failed but set hasFetchedAll=true
        if (hasFetchedAll.value) {
            const newCount = Math.min(
                displayedEpisodesCount.value + props.episodesPerPage,
                totalEpisodes.value, // Use the potentially updated total
            )
            displayedEpisodesCount.value = newCount
        }
    } catch (error) {
        console.error('Error during showMoreEpisodes:', error)
    } finally {
        isShowingMore.value = false
    }
}

// Fetch remaining episodes when the component mounts if needed - REMOVED
onMounted(() => {
    // Ensure initial state is correct based on props.
    // The ref definition already handles this based on initialEpisodes vs totalEpisodesHint.
    hasFetchedAll.value = props.initialEpisodes.length >= props.totalEpisodesHint
})

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
</script>

<template>
    <Head :title="pageInfo.title" />

    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative mb-6 flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <PodcastHeader :podcastName="podcast.title" :podcastFavicon="podcast.image" />
            <PodcastBody :podcast="podcast" :latest-podcast="allEpisodes[0]" />
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

        <!-- See More Button -->
        <!-- Show button only if 'canLoadMore' is true and not currently showing more -->
        <div v-if="canLoadMore && !isShowingMore" class="mt-4 flex justify-start">
            <div
                @click="showMoreEpisodes"
                class="cursor-pointer py-2 font-semibold text-gray-800 hover:text-green-700 disabled:opacity-50 dark:text-gray-300"
            >
                <!-- Button text depends on whether the full list has been fetched -->
                <span v-if="!hasFetchedAll">Load Episodes</span>
                <span v-else
                    >See More Episodes ({{ displayedEpisodesCount }} / {{ totalEpisodes }})</span
                >
            </div>
        </div>
        <!-- Loading indicator specifically for the "See More" action -->
        <div v-if="isShowingMore" class="mt-4 text-gray-500 dark:text-gray-400">Loading...</div>

        <!-- Message when all are displayed -->
        <!-- Show only after fetch attempt AND when count >= total AND not loading -->
        <div
            v-if="
                hasFetchedAll &&
                displayedEpisodesCount >= totalEpisodes &&
                totalEpisodes > 0 &&
                !isShowingMore
            "
            class="mt-4 text-gray-500 dark:text-gray-400"
        >
            All episodes shown.
        </div>

        <!-- Message when no episodes found initially -->
        <!-- Show only after fetch attempt AND if list is empty AND not loading -->
        <div
            v-if="hasFetchedAll && allEpisodes.length === 0 && !isShowingMore"
            class="mt-4 text-gray-500 dark:text-gray-400"
        >
            No episodes found for this podcast.
        </div>
    </div>
</template>
