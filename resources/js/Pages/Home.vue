<script setup lang="ts">
import RadioCard from '@/Components/RadioCard.vue';
import Station from '@/Interfaces/Station';
import MainLayout from '@/Layouts/MainLayout.vue';
defineOptions({
    layout: MainLayout,
});

defineProps<{
    topStations: Station[];
}>();
</script>

<template>
    <Head title="Home"></Head>
    <div id="home">
        <div
            class="grid grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-4"
        >
            <RadioCard
                v-for="station in topStations"
                :key="station.stationuuid"
                :station="station"
                class="p-4 pl-0"
            />
        </div>
    </div>
</template>
