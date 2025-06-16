<script setup lang="ts">
import Podcast from '@/Interfaces/Podcast'
import PodcastEpisode from '@/Interfaces/PodcastEpisode'
import { useFavoritePodcastStore } from '@/Stores/useFavoritePodcastStore'
import { usePodcastPlayerStore } from '@/Stores/usePodcastPlayerStore'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    LoaderCircle,
    Pause,
    Play,
} from 'lucide-vue-next'
import type { PropType } from 'vue'
import { ref } from 'vue'

const playerStore = usePodcastPlayerStore()
const favoriteStore = useFavoritePodcastStore()

defineProps({
    podcast: {
        type: Object as PropType<Podcast>,
        required: true,
    },
    latestPodcast: {
        type: Object as PropType<PodcastEpisode>,
        required: false,
    },
})

const showInfo = ref(false)

function toggleInfo() {
    showInfo.value = !showInfo.value
}

function playPodcast(podcast: Podcast, podcastEpisode: PodcastEpisode) {
    if (playerStore.podcast?.id === podcast.id && (playerStore.isPlaying || playerStore.loading)) {
        playerStore.stop()
    } else if (playerStore.podcastInit && !playerStore.isPlaying) {
        playerStore.turnOn()
    } else if (playerStore.podcastInit && playerStore.isPlaying) {
        playerStore.turnOff()
    } else {
        playerStore.setEpisode(podcastEpisode, podcast)
    }
}
</script>
<template>
    <div class="flex flex-col items-center text-center md:flex-1 md:items-start md:text-left">
        <h1 class="text-3xl leading-tight font-bold text-gray-800 dark:text-gray-200">
            {{ podcast.title }}
        </h1>
        <p class="mt-2 mb-6 text-gray-600 dark:text-gray-400">
            {{ podcast.description }}
        </p>

        <div class="mb-6 flex items-center justify-center gap-6 md:justify-start">
            <button
                v-if="latestPodcast"
                @click="playPodcast(podcast, latestPodcast)"
                class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800 dark:bg-gray-50 dark:hover:bg-gray-300"
            >
                <component
                    v-if="playerStore.loading && playerStore.podcast?.id === podcast.id"
                    :is="LoaderCircle"
                    class="h-6 w-6 animate-spin text-white dark:text-gray-900"
                />

                <component
                    v-else-if="playerStore.podcast?.id === podcast.id && playerStore.isPlaying"
                    :is="Pause"
                    class="h-6 w-6 text-white dark:text-gray-900"
                />
                <component v-else :is="Play" class="h-6 w-6 text-white dark:text-gray-900" />
            </button>
            <button @click="favoriteStore.toggleFavorite(podcast)" class="transition-colors">
                <HeartIcon
                    class="h-6 w-6 cursor-pointer stroke-current"
                    :class="
                        favoriteStore.isFavorited(podcast.id)
                            ? 'fill-gray-900 hover:fill-gray-800 dark:fill-[#e5e7eb] dark:hover:fill-gray-300'
                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                    "
                />
            </button>
        </div>

        <!-- Toggle information button -->
        <button
            @click="toggleInfo"
            class="mx-auto flex items-center justify-center bg-transparent py-2 font-medium text-gray-600 transition-colors hover:text-gray-900 md:mx-0 md:justify-start dark:text-gray-400 dark:hover:text-gray-200"
        >
            <span>{{ showInfo ? 'LESS INFORMATION' : 'MORE INFORMATION' }}</span>
            <ChevronDownIcon v-if="!showInfo" class="ml-1 h-5 w-5" />
            <ChevronUpIcon v-else class="ml-1 h-5 w-5" />
        </button>

        <!-- Divider -->
        <div class="my-4 h-px w-full bg-black/10 dark:bg-white/10"></div>

        <!-- Additional Information (Expandable) -->
        <div v-if="showInfo" class="w-full animate-[fadeIn_0.3s_ease-out_forwards] text-left">
            <div class="mb-4">
                <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">Categories:</h3>
                <div v-if="podcast.categories" class="flex flex-row gap-x-2">
                    <p
                        v-for="category in podcast.categories"
                        :key="category"
                        class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400"
                    >
                        {{ category }}
                    </p>
                </div>
                <div v-else class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                    No categories
                </div>
            </div>

            <div class="mb-4">
                <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">Language:</h3>
                <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                    {{ podcast.language }}
                </p>
            </div>

            <div class="mb-4">
                <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">Website:</h3>
                <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                    <a :href="podcast.url" target="_blank" rel="noopener noreferrer">{{
                        podcast.url
                    }}</a>
                </p>
            </div>
        </div>
    </div>
</template>
