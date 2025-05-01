<script setup lang="ts">
import StationBody from '@/Components/Radio/Station/StationBody.vue'
import StationHeader from '@/Components/Radio/Station/StationHeader.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import type { PropType } from 'vue'
defineProps({
    station: {
        type: Object as PropType<Station>,
        required: true,
    },
})

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head :title="station.name" />
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <!-- Logo section -->
            <StationHeader :stationName="station.name" :stationFavicon="station.favicon" />

            <!-- Station info section -->
            <StationBody :station="station" />
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
