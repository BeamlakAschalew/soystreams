<script setup lang="ts">
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
    <Sidebar />
    <div id="slotWrapper" class="mx-10 py-4 lg:ml-80 lg:mr-10">
        <slot></slot>
    </div>
</template>
