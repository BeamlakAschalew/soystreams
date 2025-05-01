<script setup lang="ts">
import PodcastSlider from '@/Components/Podcast/PodcastSlider.vue'
import StationSlider from '@/Components/Radio/StationSlider.vue'
import Podcast from '@/Interfaces/Podcast'
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
        view_more: string | null
    }>
    home_podcasts: Array<{
        name: string
        podcasts: Podcast[]
        view_more: string | null
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

    <div
        v-for="podcastCollection in home_podcasts"
        :key="podcastCollection.name"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <PodcastSlider
            :name="podcastCollection.name"
            :podcasts="podcastCollection.podcasts"
            :viewMore="podcastCollection.view_more"
        />
    </div>
</template>
