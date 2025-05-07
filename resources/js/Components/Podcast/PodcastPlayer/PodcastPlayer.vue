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

const formattedCurrentTime = computed(() => formatDuration(playerStore.currentTime))
const formattedDuration = computed(() => formatDuration(playerStore.duration))

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
        class="fixed bottom-0 z-40 flex max-h-24 w-full flex-row flex-wrap items-center justify-between border-t-2 border-gray-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
    >
        <!-- Left Section: Media Info -->
        <Link
            :href="getEpisodeLink"
            id="mediaInfo"
            class="flex max-w-3/5 flex-shrink-0 flex-row items-center justify-between gap-3 sm:w-full sm:flex-1 md:pr-2"
        >
            <img
                v-lazy="playerStore.episode?.image || playerStore.podcast?.image"
                class="h-12 w-12 rounded-md bg-white object-cover p-0.5 md:h-16 md:w-16 dark:bg-neutral-900"
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
        <div id="centerControls" class="flex flex-col items-center sm:flex-1 md:flex-grow md:px-4">
            <!-- Control Buttons -->
            <div class="flex items-center justify-center gap-4 md:gap-5">
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
            <div class="hidden w-full max-w-sm items-center space-x-2 md:flex">
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

        <div
            id="trailing"
            class="hidden flex-1 flex-row items-center justify-end gap-8 sm:flex sm:flex-1"
        >
            <div id="endControls" class="hidden items-center justify-end gap-8 sm:flex">
                <div
                    id="volume"
                    class="hidden flex-row flex-wrap items-center justify-center gap-3 sm:flex"
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
                                playerStore.setVolume(
                                    Number(($event.target as HTMLInputElement).value),
                                )
                            "
                        />
                    </transition>
                </div>
                <Heart
                    :class="[
                        'hidden sm:flex',
                        'cursor-pointer stroke-current text-neutral-800 dark:text-gray-200',
                    ]"
                />
            </div>
        </div>
    </div>
</template>
