<script setup lang="ts">
import StationBody from '@/Components/Station/StationBody.vue'
import StationHeader from '@/Components/Station/StationHeader.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import type { PropType } from 'vue'
const props = defineProps({
    station: {
        type: Object as PropType<Station>,
        required: true,
    },
})

const isProd = (import.meta as any).env.VITE_APP_ENV === 'production'
const radioLink = `/station/${props.station.stationuuid}`

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head>
        <!-- Primary Meta Tags -->
        <title>{{ station.name }}</title>
        <meta name="title" content="{{ station.name }}" />
        <meta
            name="description"
            content="Tune in to {{station.name}}, broadcasting in {{station.language}} from {{station.location}}. Specializing in {{station.genres}}, this station has attracted {{station.votes}} votes and {{station.clicks}} clicks from engaged listeners."
        />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta
            property="og:url"
            :content="
                isProd ? `https://soystreams.com${radioLink}` : `http://soystreams.test${radioLink}`
            "
        />
        <meta property="og:title" content="{{ station.name }}" />
        <meta
            property="og:description"
            content="Tune in to {{station.name}}, broadcasting in {{station.language}} from {{station.location}}. Specializing in {{station.genres}}, this station has attracted {{station.votes}} votes and {{station.clicks}} clicks from engaged listeners."
        />
        <meta property="og:image" :content="station.favicon" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="{{ station.name }}" />
        <meta
            property="twitter:description"
            content="Tune in to {{station.name}}, broadcasting in {{station.language}} from {{station.location}}. Specializing in {{station.genres}}, this station has attracted {{station.votes}} votes and {{station.clicks}} clicks from engaged listeners."
        />
        <meta property="twitter:image" :content="station.favicon" />

        <!-- Meta Tags Generated with https://metatags.io -->
    </Head>
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-400/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8 dark:from-green-700/80 dark:via-green-900/40"
        >
            <!-- Logo section -->
            <StationHeader :stationName="station.name" :stationFavicon="station.favicon" />

            <!-- Station info section -->
            <StationBody :station="station" />
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
