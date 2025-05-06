<template>
    <div class="episode-card py-4">
        <div class="mb-2 flex items-center">
            <button
                @click="togglePlay"
                class="play-button focus:ring-primary-500 relative mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800"
                :aria-label="isPlaying ? 'Pause episode' : 'Play episode'"
            >
                <svg class="absolute inset-0 h-full w-full" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="19" fill="none" stroke-width="1.5" />
                </svg>

                <svg class="absolute inset-0 h-full w-full" viewBox="0 0 40 40">
                    <circle
                        cx="20"
                        cy="20"
                        :r="radius"
                        fill="none"
                        stroke-width="2.5"
                        class="stroke-primary-800 dark:stroke-primary-300"
                        stroke-linecap="round"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="progressOffset"
                        transform="rotate(-90 20 20)"
                        style="transition: stroke-dashoffset 0.3s ease"
                    />
                </svg>

                <div
                    class="relative z-10 flex items-center justify-center text-gray-800 dark:text-gray-300"
                >
                    <svg
                        v-if="isPlaying"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-7 w-7"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M14.5 6.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-7Zm-6 0a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-7Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-7 w-7"
                    >
                        <path
                            d="M6.3 5.083c0-.62.69-.984 1.186-.643l7.429 4.417c.47.279.47.99 0 1.269l-7.429 4.417C6.99 14.92 6.3 14.556 6.3 13.937V5.083Z"
                        />
                    </svg>
                </div>
            </button>

            <div class="flex-grow">
                <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200">{{ title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ date }}</p>
            </div>
        </div>
        <div class="ml-[3.25rem]">
            <button
                @click="toggleDescription"
                class="hover:text-primary-600 dark:hover:text-primary-400 text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400"
            >
                {{ isExpanded ? 'Less' : 'More' }}
                <svg
                    v-if="!isExpanded"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="ml-1 inline-block h-4 w-4"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="ml-1 inline-block h-4 w-4"
                >
                    <path
                        fill-rule="evenodd"
                        d="M14.78 11.78a.75.75 0 0 1-1.06 0L10 8.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>

            <div v-if="isExpanded" class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <p>{{ description }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Duration: {{ duration }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    isPlaying: {
        type: Boolean,
        default: false,
    },
    progress: {
        type: Number,
        default: 0,
        validator: (value: number) => value >= 0 && value <= 100,
    },
})

const emit = defineEmits(['toggle-play', 'show-details'])

const isExpanded = ref(false)

const radius = 18
const circumference = 2 * Math.PI * radius

const progressOffset = computed(() => {
    return circumference - (props.progress / 100) * circumference
})

const togglePlay = () => {
    emit('toggle-play')
}

const toggleDescription = () => {
    isExpanded.value = !isExpanded.value
}
</script>
