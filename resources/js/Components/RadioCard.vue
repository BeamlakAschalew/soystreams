<script setup lang="ts">
import Station from '@/Interfaces/Station'
import stationRoute from '@/routes/station/show'
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import { router } from '@inertiajs/vue3'
import { LoaderCircle, Pause, Play } from 'lucide-vue-next'
import { computed } from 'vue'
defineProps<{
    station: Station
}>()

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

function navigateToStation(station: Station) {
    router.get(stationRoute.url(station.stationuuid))
}

const isTouchDevice = computed(() => {
    return (
        typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )
})
</script>

<template>
    <Link :href="stationRoute.url(station.stationuuid)" id="radioCard" class="w-full">
        <div id="imageContainer" class="group relative aspect-square w-full object-cover">
            <div
                class="absolute bottom-0 h-12 w-full rounded-br-lg rounded-bl-lg bg-gradient-to-t from-green-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
            <div
                class="absolute right-0 bottom-0 z-10 mr-2 mb-1 cursor-pointer rounded-full bg-gray-800 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-900"
                :class="{
                    'opacity-100': isTouchDevice,
                    'pointer-events-auto': isTouchDevice,
                }"
                @click="playRadio(station)"
            >
                <component
                    v-if="
                        playerStore.loading &&
                        playerStore.station?.stationuuid === station.stationuuid
                    "
                    :is="LoaderCircle"
                    class="animate-spin text-gray-100 dark:text-gray-200"
                    :size="20"
                />
                <component
                    v-else-if="
                        playerStore.station?.stationuuid === station.stationuuid &&
                        playerStore.isPlaying
                    "
                    :is="Pause"
                    class="text-gray-100 dark:text-gray-200"
                    :size="20"
                />
                <component v-else :is="Play" class="text-gray-100 dark:text-gray-200" :size="20" />
            </div>
            <img
                v-lazy="station.favicon"
                class="h-full w-full cursor-pointer rounded-xl bg-white object-cover p-2 dark:bg-neutral-800"
                alt=""
            />
        </div>
        <div
            id="radioTitle"
            class="mt-1 w-full truncate text-center text-neutral-900 dark:text-neutral-50"
        >
            {{ station.name }}
        </div>
    </Link>
</template>
