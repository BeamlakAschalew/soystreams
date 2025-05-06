<script setup lang="ts">
import Footer from '@/Components/Footer.vue'
import Navbar from '@/Components/Navbar.vue'
import PodcastPlayer from '@/Components/Podcast/PodcastPlayer/PodcastPlayer.vue'
import Sidebar from '@/Components/Sidebar/Sidebar.vue'
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <Navbar />
        <div id="playerContainer" class="flex flex-col">
            <Sidebar />
            <!-- <LivePlayer /> -->
            <PodcastPlayer />
        </div>
        <div id="slotWrapper" class="mx-10 flex flex-1 flex-col py-4 max-sm:mx-5 lg:mr-10 lg:ml-80">
            <div
                id="pageTitle"
                class="mb-9 text-5xl font-extrabold text-neutral-900 dark:text-neutral-50"
            >
                {{ title }}
            </div>
            <slot></slot>
        </div>
        <Footer class="lg:mr-10 lg:ml-80" />
    </div>
</template>
