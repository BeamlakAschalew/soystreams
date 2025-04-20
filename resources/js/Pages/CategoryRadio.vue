<script setup lang="ts">
import StationSlider from '@/Components/StationSlider.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
defineProps<{
    title: {
        type: String
        required: true
    }
    stations: Array<{
        name: string
        stations: Station[]
    }>
}>()

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head :title />
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            v-for="stationCollection in stations"
            :key="stationCollection.name"
            class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
        >
            <StationSlider
                :name="stationCollection.name"
                :stations="stationCollection.stations"
                :show-view-more="false"
            />
        </div>
    </div>
</template>
