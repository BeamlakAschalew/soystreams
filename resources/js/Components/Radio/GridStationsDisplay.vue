<script setup lang="ts">
import RadioCard from '@/Components/Radio/RadioCard.vue'
import Station from '@/Interfaces/Station'
defineProps<{
    noInput: boolean
    currentPage: number
    hasMore: boolean
    stations: Station[]
    title: string | null
    loadMore: () => void
}>()
</script>

<template>
    <div v-if="!noInput" class="mt-6">
        <h2 v-if="title" class="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {{ title }}
        </h2>
        <div
            v-if="stations.length"
            class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4"
        >
            <RadioCard v-for="station in stations" :key="station.stationuuid" :station="station" />
        </div>
        <div v-else>
            <p class="text-center text-gray-500 dark:text-gray-400">No results found.</p>
        </div>

        <!-- Load More button -->
        <div class="mt-4 flex items-start justify-start">
            <div
                v-if="hasMore"
                @click="loadMore"
                class="py-2 font-semibold text-gray-800 hover:cursor-pointer hover:text-green-600 dark:text-gray-300"
            >
                See More
            </div>
        </div>
    </div>
</template>
