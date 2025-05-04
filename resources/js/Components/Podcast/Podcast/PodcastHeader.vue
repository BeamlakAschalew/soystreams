<script setup lang="ts">
defineProps({
    podcastName: {
        type: String,
        required: true,
    },
    podcastFavicon: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="mb-6 flex justify-center md:mr-8 md:mb-0 md:flex-shrink-0">
        <div
            class="flex h-44 w-44 items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-lg md:h-48 md:w-48 lg:h-52 lg:w-52 dark:bg-neutral-800"
        >
            <img
                v-lazy="podcastFavicon"
                :alt="`${podcastName} Logo`"
                class="h-full w-full object-cover"
            />
        </div>
    </div>
</template>
