<script setup lang="ts">
import MainLayout from '@/Layouts/MainLayout.vue'
import { computed } from 'vue'

const props = defineProps({ status: Number })

const title = computed(() => {
    return {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[props.status ?? 0]
})

const image = computed(() => {
    return {
        503: '503.svg',
        500: '500.svg',
        404: '404.svg',
        403: '403.svg',
    }[props.status ?? 0]
})
defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <Head :title="title" />
    <div class="mb-8 flex h-full flex-1 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div class="flex flex-1 flex-col items-center justify-center">
            <img
                :src="`/images/${image}`"
                alt="Error"
                class="mx-auto mb-4 h-64 w-64 object-cover"
            />
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>
