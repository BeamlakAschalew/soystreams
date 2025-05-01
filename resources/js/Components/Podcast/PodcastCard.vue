<script setup lang="ts">
import Podcast from '@/Interfaces/Podcast'
import stationRoute from '@/routes/station/show'
defineProps<{
    station: Podcast
}>()
</script>

<template>
    <div id="podcastCard" class="w-full">
        <Link :href="stationRoute.url(station.podcastGuid)">
            <div id="imageContainer" class="group relative aspect-square w-full object-cover">
                <div
                    class="from-primary-600 absolute bottom-0 h-12 w-full rounded-br-lg rounded-bl-lg bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                ></div>

                <img
                    v-lazy="station.image"
                    class="h-full w-full cursor-pointer rounded-xl bg-white object-cover p-2 dark:bg-neutral-800"
                    :alt="`${station.title} Logo`"
                />
            </div>
            <div
                id="radioTitle"
                class="mt-1 w-full truncate text-center text-neutral-900 dark:text-neutral-50"
            >
                {{ station.title }}
            </div>
        </Link>
    </div>
</template>
