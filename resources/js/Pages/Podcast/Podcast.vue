<script setup lang="ts">
import PodcastBody from '@/Components/Podcast/Podcast/PodcastBody.vue'
import PodcastHeader from '@/Components/Podcast/Podcast/PodcastHeader.vue'
import Podcast from '@/Interfaces/Podcast'
import MainLayout from '@/Layouts/MainLayout.vue'
import type { PropType } from 'vue'

defineProps({
    podcast: {
        type: Object as PropType<Podcast>,
        required: true,
    },
})

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head :title="podcast.title" />
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <!-- Logo section -->
            <PodcastHeader :podcastName="podcast.title" :podcastFavicon="podcast.image" />

            <!-- Podcast info section -->
            <PodcastBody :podcast="podcast" />
        </div>
    </div>
</template>
