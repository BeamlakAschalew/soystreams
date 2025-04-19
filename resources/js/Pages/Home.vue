<script setup lang="ts">
import StationSlider from '@/Components/StationSlider.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'

defineOptions({
    layout: MainLayout,
})
defineProps<{
    home_stations: Array<{
        name: string
        stations: Station[]
    }>
}>()
</script>

<template>
    <Head title="Home" />

    <div
        v-for="stationCollection in home_stations"
        :key="stationCollection.name"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <StationSlider :name="stationCollection.name" :stations="stationCollection.stations" />
    </div>
</template>
