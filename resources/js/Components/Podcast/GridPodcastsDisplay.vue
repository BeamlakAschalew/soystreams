<script setup lang="ts">
import PodcastCard from '@/Components/Podcast/PodcastCard.vue'
import Podcast from '@/Interfaces/Podcast'
defineProps<{
    noInput: boolean
    currentPage: number
    hasMore: boolean
    podcasts: Podcast[]
    title: string | null
}>()
</script>

<template>
    <div v-if="!noInput" class="mt-6">
        <h2 v-if="title" class="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {{ title }}
        </h2>
        <div
            v-if="podcasts.length"
            class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4"
        >
            <PodcastCard v-for="podcast in podcasts" :key="podcast.id" :podcast="podcast" />
        </div>
        <div v-else>
            <p class="text-center text-gray-500 dark:text-gray-400">No results found.</p>
        </div>
    </div>
</template>
