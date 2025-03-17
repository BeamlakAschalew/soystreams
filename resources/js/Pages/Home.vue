<script setup lang="ts">
import RadioCard from '@/Components/RadioCard.vue';
import MainLayout from '@/Layouts/MainLayout.vue';
defineOptions({
    layout: MainLayout,
});
</script>

<template>
    <Head title="Home"></Head>
    <div id="home" class="">
        <RadioCard />
    </div>
</template>
