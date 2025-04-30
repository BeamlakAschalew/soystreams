<script setup lang="ts">
import MainLayout from '@/Layouts/MainLayout.vue'

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head title="About" />
    <div id="about" class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div class="flex flex-col text-neutral-900 dark:text-neutral-50">
            <p class="mb-4">
                Soystreams is a modern, open-source platform for discovering and listening to live
                radio stations and podcasts from around the world.
            </p>
            <p class="mb-4">
                Browse curated categories or search by genre, location, or station name to find your
                perfect stream. Save favorites, create custom playlists, and pick up right where you
                left off.
            </p>
            <p>
                Whether you’re into music, news, talk, or sports, Soystreams has you covered. Join
                our community and tune in to the airwaves anytime, on any device.
            </p>
            <p class="self-end">v1.0.0</p>
        </div>
    </div>
</template>
