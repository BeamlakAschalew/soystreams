<script setup lang="ts">
import RadioCard from '@/Components/RadioCard.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import { onMounted, ref } from 'vue'

defineOptions({
    layout: MainLayout,
})
defineProps<{
    home_stations: Array<{
        name: string
        stations: Station[]
    }>
}>()

const scrollContainer = ref<HTMLDivElement | null>(null)

const scrollLeft = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' })
    }
}

const scrollRight = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' })
    }
}

onMounted(() => {
    if (!scrollContainer.value) {
        console.error('scrollContainer is not bound to the DOM element.')
    }
})
</script>

<template>
    <Head title="Home" />

    <div
        v-for="stationCollection in home_stations"
        :key="stationCollection.name"
        class="mb-8 2xl:max-w-[80%]"
    >
        <div class="mb-2 flex flex-row items-center justify-between">
            <!-- Title -->
            <div class="font-bold text-neutral-900 dark:text-neutral-50">
                {{ stationCollection.name }}
            </div>
            <div class="text-primary">View more</div>
        </div>
        <!-- Slider -->
        <div
            data-hs-carousel='{
                "loadingClasses": "opacity-0",
                "slidesQty": {
                    "xs": 2,
                    "sm": 3,
                    "md": 4,
                    "lg": 4,
                    "xl": 6
                },
                "isDraggable": true
            }'
            class="relative"
        >
            <div class="hs-carousel w-full overflow-hidden rounded-lg bg-white dark:bg-neutral-950">
                <div class="relative -mx-1 min-h-52">
                    <div
                        class="hs-carousel-body absolute bottom-0 start-0 top-0 flex cursor-grab flex-nowrap items-center justify-center transition-transform duration-700 hs-carousel-dragging:cursor-grabbing hs-carousel-dragging:transition-none"
                    >
                        <div
                            v-for="station in stationCollection.stations"
                            :key="station.stationuuid"
                            class="hs-carousel-slide flex items-center justify-center"
                        >
                            <RadioCard :station="station" class="w-[150px] flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                class="hs-carousel-prev w-11.5 focus:outline-hidden absolute inset-y-0 start-0 inline-flex h-full items-center justify-center rounded-s-lg text-gray-800 hover:bg-gray-800/10 focus:bg-gray-800/10 hs-carousel-disabled:pointer-events-none hs-carousel-disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <span class="text-2xl" aria-hidden="true">
                    <svg
                        class="size-5 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </span>
                <span class="sr-only">Previous</span>
            </button>
            <button
                type="button"
                class="hs-carousel-next w-11.5 focus:outline-hidden absolute inset-y-0 end-0 inline-flex h-full items-center justify-center rounded-e-lg text-gray-800 hover:bg-gray-800/10 focus:bg-gray-800/10 hs-carousel-disabled:pointer-events-none hs-carousel-disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <span class="sr-only">Next</span>
                <span class="text-2xl" aria-hidden="true">
                    <svg
                        class="size-5 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </span>
            </button>
        </div>
        <!-- End Slider -->
    </div>
</template>
