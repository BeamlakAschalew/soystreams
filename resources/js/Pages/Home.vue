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
    <Head title="Home" />
    <div id="home">
        <div id="radiosName" class="font-bold">Top 200 Pop</div>
        <div
            class="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:gap-6"
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
