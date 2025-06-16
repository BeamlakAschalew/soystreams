<script setup lang="ts">
import GridPodcastsDisplay from '@/Components/Podcast/GridPodcastsDisplay.vue'
import MainLayout from '@/Layouts/MainLayout.vue'
import { useFavoritePodcastStore } from '@/Stores/useFavoritePodcastStore'
defineOptions({
    layout: MainLayout,
})

const favoriteStore = useFavoritePodcastStore()
</script>

<template>
    <Head title="Favorite Podcasts" />

    <div
        v-if="favoriteStore.favorites.length !== 0"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <GridPodcastsDisplay
            :podcasts="favoriteStore.favorites"
            :has-more="false"
            :no-input="false"
            :current-page="1"
            :title="null"
            :load-more="() => {}"
        />
    </div>
    <div v-else class="text-neutral-500">No favorite podcasts available.</div>
</template>
