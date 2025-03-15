<script setup lang="ts">
import { computed } from 'vue';
interface Props {
    active?: boolean;
    path: string;
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
});

const itemStyle = computed(() => ({
    'focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700':
        true,
    'dark:bg-neutral-700 dark:text-white': props.active,
    'dark:bg-neutral-800 dark:text-neutral-200': !props.active,
}));
</script>

<template>
    <li>
        <a :class="itemStyle" href="#">
            <slot></slot>
        </a>
    </li>
</template>
