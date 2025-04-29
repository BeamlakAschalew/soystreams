<script setup lang="ts">
import StationSlider from '@/Components/StationSlider.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import { useRecentStationStore } from '@/Stores/useRecentStationStore'
defineOptions({
    layout: MainLayout,
})
defineProps<{
    home_stations: Array<{
        name: string
        stations: Station[]
        view_more: string
    }>
}>()

const recentStore = useRecentStationStore()
</script>

<template>
    <Head title="Home" />

    <div
        v-if="recentStore.recents.length !== 0"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <StationSlider
            name="Continue listening"
            :stations="recentStore.recents"
            :showViewMore="false"
        />
    </div>

    <div
        v-for="stationCollection in home_stations"
        :key="stationCollection.name"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <StationSlider
            :name="stationCollection.name"
            :stations="stationCollection.stations"
            :viewMore="stationCollection.view_more"
        />
    </div>
</template>
