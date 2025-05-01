<script setup lang="ts">
import Station from '@/Interfaces/Station'
import RadioCard from './Radio/RadioCard.vue'

withDefaults(
    defineProps<{
        name: string
        stations: Station[]
        showViewMore?: boolean
        viewMore?: string
    }>(),
    {
        showViewMore: true,
    },
)
</script>

<template>
    <div class="mb-2 flex flex-row items-center justify-between">
        <!-- Title -->
        <div class="font-bold text-neutral-900 dark:text-neutral-50">
            {{ name }}
        </div>
        <Link
            :href="viewMore"
            v-if="showViewMore"
            class="text-primary cursor-pointer font-semibold hover:text-green-800"
        >
            View more
        </Link>
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
        <div class="hs-carousel w-full overflow-hidden rounded-lg py-4">
            <div class="relative -mx-1 min-h-44">
                <div
                    class="hs-carousel-body hs-carousel-dragging:cursor-grabbing hs-carousel-dragging:transition-none absolute start-0 top-0 bottom-0 flex cursor-grab flex-nowrap items-center justify-center transition-transform duration-700"
                >
                    <div
                        v-for="station in stations"
                        :key="station.stationuuid"
                        class="hs-carousel-slide flex items-center justify-center"
                    >
                        <RadioCard
                            :station="station"
                            class="max-w-[150px] flex-shrink-0 px-0 sm:max-w-[200px] sm:min-w-[150px] sm:px-4"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button
            type="button"
            class="hs-carousel-prev hs-carousel-disabled:pointer-events-none hs-carousel-disabled:opacity-50 text-primary dark:text-primary absolute inset-y-0 start-0 inline-flex h-full w-11.5 items-center justify-center rounded-s-lg hover:bg-green-400/10 focus:bg-green-400/10 focus:outline-hidden dark:hover:bg-green-400/10 dark:focus:bg-green-400/10"
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
            class="hs-carousel-next hs-carousel-disabled:pointer-events-none hs-carousel-disabled:opacity-50 text-primary dark:text-primary absolute inset-y-0 end-0 inline-flex h-full w-11.5 items-center justify-center rounded-e-lg hover:bg-green-400/10 focus:bg-green-400/10 focus:outline-hidden dark:hover:bg-green-400/10 dark:focus:bg-green-400/10"
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
</template>
