<script setup lang="ts">
import LivePlayer from '@/Components/LivePlayer/LivePlayer.vue';
import Navbar from '@/Components/Navbar.vue';
import Sidebar from '@/Components/Sidebar/Sidebar.vue';

defineProps<{
    title: string;
}>();
</script>

<template>
    <Navbar />
    <div id="playerContainer" class="flex flex-col">
        <Sidebar />
        <LivePlayer />
    </div>
    <div
        id="slotWrapper"
        class="mx-10 mb-20 py-4 max-sm:mx-5 lg:ml-80 lg:mr-10"
    >
        <div
            id="pageTitle"
            class="mb-9 text-5xl font-extrabold text-neutral-900 dark:text-neutral-50"
        >
            {{ title }}
        </div>
        <slot></slot>
    </div>
</template>
