<script setup lang="ts">
import LivePlayer from '@/Components/LivePlayer/LivePlayer.vue';
import Navbar from '@/Components/Navbar.vue';
import Sidebar from '@/Components/Sidebar/Sidebar.vue';
import { Head } from '@inertiajs/vue3';

defineProps<{
    pageTitle: string;
}>();
</script>

<template>
    <Head :title="pageTitle"></Head>
    <Navbar />
    <div id="playerContainer" class="flex flex-col">
        <Sidebar />
        <LivePlayer />
    </div>
    <div id="slotWrapper" class="mx-10 py-4 lg:ml-80 lg:mr-10">
        <slot></slot>
    </div>
</template>
