<script setup lang="ts">
import { usePodcastPlayerStore } from '@/Stores/usePodcastPlayerStore'
import { Link } from '@inertiajs/vue3'
import {
    Heart,
    LoaderCircle,
    Pause,
    Play,
    RotateCcwIcon,
    RotateCwIcon,
    Volume1,
    Volume2,
    VolumeOff,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'

const playerStore = usePodcastPlayerStore()
const showVolumeControl = ref(false)

const currentIcon = computed(() => {
    if (playerStore.loading) {
        return LoaderCircle
    }
    return playerStore.isPlaying ? Pause : Play
})

function toggleVolumeControl() {
    showVolumeControl.value = !showVolumeControl.value
}

const getEpisodeLink = computed(() => {
    if (playerStore.episode && playerStore.podcast) {
        return '#' // Placeholder
    }
    return '#'
})

const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity || timeInSeconds < 0) {
        return '00:00'
    }
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const formattedCurrentTime = computed(() => formatTime(playerStore.currentTime))
const formattedDuration = computed(() => formatTime(playerStore.duration))

const handleSeek = (event: Event) => {
    const target = event.target as HTMLInputElement
    playerStore.seek(Number(target.value))
}

const handleRewind = () => {
    let newTime = playerStore.currentTime - 15
    if (newTime < 0) newTime = 0
    playerStore.seek(newTime)
}

const handleFastForward = () => {
    let newTime = playerStore.currentTime + 15
    if (newTime > playerStore.duration && playerStore.duration > 0) {
        newTime = playerStore.duration
    }
    playerStore.seek(newTime)
}

// Placeholder for favorite action
const toggleFavorite = () => {
    console.log('Favorite toggled for:', playerStore.episode?.title)
    // Implement actual favoriting logic here, likely involving the store
}
</script>

<template>
    <div
        id="podcastPlayer"
        v-if="playerStore.podcastInit"
        class="fixed right-0 bottom-0 left-0 z-40 flex w-full flex-col items-stretch border-t-2 border-gray-200 bg-white p-3 md:flex-row md:items-center md:px-4 md:py-2 dark:border-neutral-700 dark:bg-neutral-950"
    >
        <!-- Left Section: Media Info -->
        <Link
            :href="getEpisodeLink"
            id="mediaInfo"
            class="mb-2 flex w-full flex-shrink-0 flex-row items-center justify-start gap-3 md:mb-0 md:w-1/3 md:pr-4"
        >
            <img
                v-lazy="playerStore.episode?.image || playerStore.podcast?.image"
                class="h-10 w-10 rounded-md bg-white object-cover p-0.5 md:h-12 md:w-12 dark:bg-neutral-900"
                alt="Episode/Podcast artwork"
            />
            <div id="mediaTitle" class="min-w-0 flex-1">
                <div
                    class="line-clamp-1 text-sm font-medium text-neutral-900 md:text-base dark:text-neutral-50"
                >
                    {{ playerStore.episode?.title || playerStore.podcast?.title || 'No Title' }}
                </div>
                <div
                    v-if="playerStore.podcast && playerStore.episode"
                    class="line-clamp-1 text-xs text-gray-500 dark:text-gray-400"
                >
                    {{ playerStore.podcast.title }}
                </div>
            </div>
        </Link>

        <!-- Center Section: Controls & Seek Bar -->
        <div
            id="centerControls"
            class="mb-2 flex w-full flex-col items-center md:mb-0 md:flex-grow md:px-4"
        >
            <!-- Control Buttons -->
            <div class="mb-1.5 flex items-center justify-center gap-4 md:gap-5">
                <button
                    @click="handleRewind"
                    aria-label="Rewind 15 seconds"
                    class="hover:text-primary-dark dark:hover:text-primary-light text-neutral-600 disabled:opacity-50 dark:text-neutral-400"
                    :disabled="!playerStore.episode"
                >
                    <RotateCcwIcon :size="20" />
                </button>

                <button
                    @click="playerStore.togglePlayPause"
                    :aria-label="playerStore.isPlaying ? 'Pause' : 'Play'"
                    class="rounded-full bg-neutral-800 p-2 text-white shadow-sm hover:bg-neutral-700 disabled:opacity-50 md:p-2.5 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300"
                    :disabled="!playerStore.episode"
                >
                    <component
                        :is="currentIcon"
                        :size="24"
                        :class="[{ 'animate-spin': playerStore.loading }]"
                    />
                </button>

                <button
                    @click="handleFastForward"
                    aria-label="Fast forward 15 seconds"
                    class="hover:text-primary-dark dark:hover:text-primary-light text-neutral-600 disabled:opacity-50 dark:text-neutral-400"
                    :disabled="!playerStore.episode"
                >
                    <RotateCwIcon :size="20" />
                </button>
            </div>

            <!-- Seek Bar and Time -->
            <div class="flex w-full max-w-sm items-center space-x-2">
                <span class="w-10 text-center text-xs text-neutral-500 dark:text-neutral-400">{{
                    formattedCurrentTime
                }}</span>
                <input
                    type="range"
                    min="0"
                    :max="playerStore.duration"
                    :value="playerStore.currentTime"
                    @input="handleSeek"
                    class="h-0.5 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-300 accent-neutral-700 dark:bg-neutral-600 dark:accent-neutral-300 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-700 dark:[&::-moz-range-thumb]:bg-neutral-300 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-700 dark:[&::-webkit-slider-thumb]:bg-neutral-300"
                    :disabled="
                        !playerStore.duration ||
                        playerStore.duration === Infinity ||
                        playerStore.duration <= 0
                    "
                />
                <span class="w-10 text-center text-xs text-neutral-500 dark:text-neutral-400">{{
                    formattedDuration
                }}</span>
            </div>
        </div>

        <!-- Right Section: Volume & Favorite -->
        <div
            id="endControls"
            class="flex w-full items-center justify-center gap-3 md:justify-end md:pl-4"
        >
            <div
                id="volume"
                class="hidden flex-row flex-wrap items-center justify-center gap-3 md:flex"
            >
                <component
                    :is="
                        playerStore.volume === 0
                            ? VolumeOff
                            : playerStore.volume <= 20
                              ? Volume1
                              : Volume2
                    "
                    @click="toggleVolumeControl"
                    class="cursor-pointer text-neutral-800 dark:text-gray-200"
                />
                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 scale-y-0"
                    enter-to-class="opacity-100 scale-y-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100 scale-y-100"
                    leave-to-class="opacity-0 scale-y-0"
                >
                    <input
                        v-show="showVolumeControl"
                        type="range"
                        class="accent-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary h-1 w-32 cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-300 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                        :value="playerStore.volume"
                        @input="
                            playerStore.setVolume(Number(($event.target as HTMLInputElement).value))
                        "
                    />
                </transition>
            </div>
            <Heart :class="['cursor-pointer stroke-current text-neutral-800 dark:text-gray-200']" />

            <!-- Mobile Volume Control (absolutely positioned) -->
            <div class="absolute right-4 bottom-4 md:hidden">
                <button
                    @click="toggleVolumeControl"
                    class="rounded-full p-1.5 text-neutral-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    aria-label="Toggle volume control"
                >
                    <component
                        :is="
                            playerStore.volume === 0
                                ? VolumeOff
                                : playerStore.volume <= 50
                                  ? Volume1
                                  : Volume2
                        "
                        :size="20"
                    />
                </button>
                <input
                    v-show="showVolumeControl"
                    type="range"
                    min="0"
                    :max="100"
                    class="accent-primary dark:[&::-moz-range-thumb]:bg-primary dark:[&::-webkit-slider-thumb]:bg-primary writing-mode-vertical-lr [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:bg-primary absolute -top-12 right-0 h-20 w-5 -translate-x-1/2 cursor-pointer appearance-none bg-transparent dark:bg-transparent [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                    :value="playerStore.volume"
                    @input="
                        playerStore.setVolume(Number(($event.target as HTMLInputElement).value))
                    "
                    orient="vertical"
                />
            </div>
        </div>
    </div>
</template>
