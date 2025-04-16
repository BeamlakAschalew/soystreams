<script setup lang="ts">
import {Link} from '@inertiajs/vue3'
import {computed} from 'vue'
interface Props {
    active?: boolean
    path: string
    size?: number
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    size: 15,
})

const itemStyle = computed(() => ({
    'focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-lightPrimary focus:bg-lightPrimary dark:hover:bg-primary dark:hover:text-neutral-800 dark:focus:bg-primary':
        true,
    'bg-lightPrimary dark:bg-primary dark:text-neutral-800': props.active,
    'bg-white dark:bg-neutral-800 dark:text-neutral-200': !props.active,
}))
</script>

<template>
    <li>
        <Link :class="itemStyle" :href="props.path">
            <slot name="icon" :size="props.size"></slot>
            <slot></slot>
        </Link>
    </li>
</template>
