<script setup lang="ts">
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    LoaderCircle,
    Pause,
    Play,
    ShareIcon,
} from 'lucide-vue-next'
import type { PropType } from 'vue'
import { ref } from 'vue'

const showInfo = ref(false)

function toggleInfo() {
    showInfo.value = !showInfo.value
}

defineProps({
    station: {
        type: Object as PropType<Station>,
        required: true,
    },
})

defineOptions({
    layout: MainLayout,
})

const playerStore = usePlayerStore()

function playRadio(station: Station) {
    if (
        playerStore.station?.stationuuid === station.stationuuid &&
        (playerStore.isPlaying || playerStore.loading)
    ) {
        playerStore.stop()
    } else {
        playerStore.setRadio(station)
    }
}
</script>

<template>
    <Head :title="station.name" />
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <!-- Logo section -->
            <div class="mb-6 flex justify-center md:mr-8 md:mb-0 md:flex-shrink-0">
                <div
                    class="flex h-44 w-44 items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-lg md:h-48 md:w-48 lg:h-52 lg:w-52 dark:bg-neutral-800"
                >
                    <img
                        v-lazy="station.favicon"
                        alt="Sheger FM Radio Logo"
                        class="max-h-full max-w-full object-contain"
                    />
                </div>
            </div>

            <!-- Station info section -->
            <div
                class="flex flex-col items-center text-center md:flex-1 md:items-start md:text-left"
            >
                <h1 class="text-3xl leading-tight font-bold text-gray-800 dark:text-gray-200">
                    {{ station.name }}
                </h1>
                <p class="mt-2 mb-6 text-gray-600 dark:text-gray-400">{{ station.votes }} Votes</p>

                <div class="mb-6 flex items-center justify-center gap-6 md:justify-start">
                    <button
                        @click="playRadio(station)"
                        class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        <component
                            v-if="
                                playerStore.loading &&
                                playerStore.station?.stationuuid === station.stationuuid
                            "
                            :is="LoaderCircle"
                            class="h-6 w-6 animate-spin text-gray-100 dark:text-gray-200"
                        />

                        <component
                            v-else-if="
                                playerStore.station?.stationuuid === station.stationuuid &&
                                playerStore.isPlaying
                            "
                            :is="Pause"
                            class="h-6 w-6 text-gray-100 dark:text-gray-200"
                        />
                        <component
                            v-else
                            :is="Play"
                            class="h-6 w-6 text-gray-100 dark:text-gray-200"
                        />
                    </button>
                    <button
                        class="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <HeartIcon class="h-6 w-6" />
                    </button>
                    <button
                        class="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ShareIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Toggle information button -->
                <button
                    @click="toggleInfo"
                    class="mx-auto flex items-center justify-center bg-transparent px-4 py-2 font-medium text-gray-600 transition-colors hover:text-gray-900 md:mx-0 md:justify-start dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <span>{{ showInfo ? 'LESS INFORMATION' : 'MORE INFORMATION' }}</span>
                    <ChevronDownIcon v-if="!showInfo" class="ml-1 h-5 w-5" />
                    <ChevronUpIcon v-else class="ml-1 h-5 w-5" />
                </button>

                <!-- Divider -->
                <div class="my-4 h-px w-full bg-black/10 dark:bg-white/10"></div>

                <!-- Additional Information (Expandable) -->
                <div
                    v-if="showInfo"
                    class="w-full animate-[fadeIn_0.3s_ease-out_forwards] text-left"
                >
                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                            Location:
                        </h3>
                        <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                            {{ station.state }}, {{ station.country }}
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">Genres:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                            {{ station.tags }}
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                            Language:
                        </h3>
                        <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                            {{ station.language }}
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                            Website:
                        </h3>
                        <p class="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                            <a :href="station.homepage" target="_blank" rel="noopener noreferrer">{{
                                station.homepage
                            }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
