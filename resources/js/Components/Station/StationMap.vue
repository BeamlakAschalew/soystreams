<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from 'vue'

const props = defineProps({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
})

const icon = L.icon({
    iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

onMounted(() => {
    const map = L.map('map').setView([props.latitude, props.longitude], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.marker([props.latitude, props.longitude], { icon })
        .addTo(map)
        .bindPopup('Radio station is located here!')
        .openPopup()
})
</script>

<template>
    <div class="mb-1 font-semibold text-gray-800 dark:text-gray-200">Station Map</div>
    <div id="map" class="h-[400px] w-full"></div>
</template>
