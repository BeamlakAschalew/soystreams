<script setup lang="ts">
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import { Heart, Pause, Play, Volume1, Volume2, VolumeOff } from 'lucide-vue-next'
import { ref } from 'vue'

const playerStore = usePlayerStore()
const showVolumeControl = ref(false)

function toggleVolumeControl() {
    showVolumeControl.value = !showVolumeControl.value
}
</script>

<template>
    <div
        id="livePlayer"
        v-if="playerStore.radioInit"
        class="fixed bottom-0 z-40 flex max-h-24 w-full flex-row flex-wrap items-center justify-between border-t-2 border-gray-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
    >
        <div id="imageTitle" class="flex flex-1 flex-row items-center justify-start gap-4">
            <img
                :src="playerStore.station?.favicon"
                class="h-16 w-16 rounded-lg bg-white object-cover p-1 max-md:h-10 max-md:w-10 dark:bg-neutral-900"
                alt=""
            />
            <div id="radioTitle" class="line-clamp-1 text-neutral-900 dark:text-neutral-50">
                {{ playerStore.station?.name }}
            </div>
        </div>

        <div
            id="trailing"
            class="flex flex-1 flex-row flex-wrap items-center justify-between gap-8 max-md:justify-end"
        >
            <div
                id="playControl"
                class="order-last flex flex-col items-center justify-center md:order-first"
            >
                <div
                    id="playBtn"
                    class="rounded-full bg-gray-800 p-3 dark:bg-gray-900"
                    @click="playerStore.togglePlayPause"
                >
                    <div class="hidden max-sm:block">
                        <component
                            :is="playerStore.isPlaying ? Pause : Play"
                            :size="20"
                            class="text-gray-100 dark:text-gray-200"
                        />
                    </div>
                    <div class="hidden sm:max-lg:block">
                        <component
                            :is="playerStore.isPlaying ? Pause : Play"
                            :size="28"
                            class="text-gray-100 dark:text-gray-200"
                        />
                    </div>
                    <div class="hidden lg:block">
                        <component
                            :is="playerStore.isPlaying ? Pause : Play"
                            :size="36"
                            class="text-gray-100 dark:text-gray-200"
                        />
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-xs font-bold text-green-600">LIVE</span>
                    <div class="mt-1 w-10 border-b-2 border-green-600"></div>
                </div>
            </div>
            <div id="endControls" class="flex items-center justify-end gap-8">
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
                        class="text-neutral-800 dark:text-gray-200"
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
                <Heart class="text-neutral-800 dark:text-gray-200" />
            </div>
        </div>
    </div>
</template>
