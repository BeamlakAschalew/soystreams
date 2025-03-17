<script setup lang="ts">
import Station from '@/Interfaces/Station';
import { usePlayerStore } from '@/Stores/useLivePlayerStore';
import { Pause, Play } from 'lucide-vue-next';
defineProps<{
    station: Station;
}>();

const playerStore = usePlayerStore();

function playRadio(station: Station) {
    playerStore.setRadio(station);
}
</script>

<template>
    <div id="radioCard" class="w-fit">
        <div id="imageContainer" class="group relative">
            <div
                class="absolute bottom-0 h-12 w-40 rounded-bl-lg rounded-br-lg bg-gradient-to-t from-green-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                <div
                    class="absolute bottom-0 right-0 mb-1 mr-2 cursor-pointer rounded-full bg-gray-800 p-3 dark:bg-gray-900"
                    @click="playRadio(station)"
                >
                    <component
                        :is="
                            playerStore.station?.stationuuid ===
                                station.stationuuid && playerStore.isPlaying
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
                class="h-40 w-40 cursor-pointer rounded-xl bg-white p-2 dark:bg-neutral-800"
                alt=""
            />
        </div>

        <div id="radioTitle" class="text-neutral-900 dark:text-neutral-50">
            {{ station.name }}
        </div>
    </div>
</template>
