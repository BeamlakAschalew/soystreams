<script setup lang="ts">
import { Heart, Play, Volume2 } from 'lucide-vue-next';
import { ref } from 'vue';

const showVolumeControl = ref(false);

function toggleVolumeControl() {
    showVolumeControl.value = !showVolumeControl.value;
}
</script>

<template>
    <div
        id="livePlayer"
        class="fixed bottom-0 z-50 flex w-full flex-row items-center justify-between border-t-2 border-gray-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
    >
        <div
            id="imageTitle"
            class="flex flex-row items-center justify-center gap-4"
        >
            <img
                src="https://static.wixstatic.com/media/b24dd6_2ef687e27c8a41ac84e14a7ff8849f83~mv2.png/v1/fill/w_175,h_175,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/W_o%20Background.png"
                class="h-16"
                alt=""
            />
            <div id="radioTitle" class="text-neutral-900 dark:text-neutral-50">
                Sheger
            </div>
        </div>
        <div id="playControl">
            <div
                id="playBtn"
                class="rounded-full bg-gray-800 p-3 dark:bg-gray-900"
            >
                <Play class="text-gray-100 dark:text-gray-200" :size="32" />
            </div>
        </div>
        <div id="trailing" class="flex flex-row gap-8">
            <div
                id="volume"
                class="flex flex-row items-center justify-center gap-3"
            >
                <Volume2
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
                        class="h-1 w-32 cursor-pointer appearance-none rounded-lg bg-gray-300 accent-primary [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-runnable-track]:bg-gray-300 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                </transition>
            </div>
            <Heart class="text-neutral-800 dark:text-gray-200" />
        </div>
    </div>
</template>
