<script setup lang="ts">
import Station from '@/Interfaces/Station'
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import { Pause, Play } from 'lucide-vue-next'
defineProps<{
    station: Station
}>()

const playerStore = usePlayerStore()

function playRadio(station: Station) {
    playerStore.setRadio(station)
}
</script>

<template>
    <div id="radioCard" class="w-full">
        <div id="imageContainer" class="group relative aspect-square w-full">
            <div
                class="absolute bottom-0 h-12 w-full rounded-bl-lg rounded-br-lg bg-gradient-to-t from-green-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                <div
                    class="absolute bottom-0 right-0 mb-1 mr-2 cursor-pointer rounded-full bg-gray-800 p-3 dark:bg-gray-900"
                    @click="playRadio(station)"
                >
                    <component
                        :is="
                            playerStore.station?.stationuuid === station.stationuuid &&
                            playerStore.isPlaying
                                ? Pause
                                : Play
                        "
                        class="text-gray-100 dark:text-gray-200"
                        :size="12"
                    />
                </div>
            </div>
            <img
                :src="station.favicon"
                class="h-full w-full cursor-pointer rounded-xl bg-white p-2 dark:bg-neutral-800"
                alt=""
            />
        </div>

        <div
            id="radioTitle"
            class="mt-1 w-full truncate text-center text-neutral-900 dark:text-neutral-50"
        >
            {{ station.name }}
        </div>
    </div>
</template>
