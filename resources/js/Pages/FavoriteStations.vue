<script setup lang="ts">
import GridChannelsDisplay from '@/Components/GridChannelsDisplay.vue'
import MainLayout from '@/Layouts/MainLayout.vue'
import { useFavoriteStationStore } from '@/Stores/useFavoriteStationStore'
defineOptions({
    layout: MainLayout,
})

const favoriteStore = useFavoriteStationStore()
</script>

<template>
    <Head title="Favorite Stations" />

    <div
        v-if="favoriteStore.favorites.length !== 0"
        class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50"
    >
        <GridChannelsDisplay
            :stations="favoriteStore.favorites"
            :has-more="false"
            :no-input="false"
            :current-page="1"
            :title="null"
            :load-more="() => {}"
        />
    </div>
    <div v-else class="text-neutral-500">No favorite stations available.</div>
</template>
