<script setup lang="ts">
import SidebarMenuItem from '@/Components/Sidebar/SidebarMenuItem.vue'
import {House, Languages, MapPin, Mic, Music, Search, Volleyball} from 'lucide-vue-next'
</script>

<template>
    <nav
        class="h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
    >
        <div
            class="hs-accordion-group flex w-full flex-col flex-wrap px-2 pb-0"
            data-hs-accordion-always-open
        >
            <ul class="space-y-1">
                <SidebarMenuItem path="/" :active="$page.component === 'Home'">
                    <template #icon="{size}"><House :size="size" /></template>Home</SidebarMenuItem
                >
                <SidebarMenuItem path="/about" :active="$page.component === 'About'"
                    ><template #icon="{size}"><Search :size="size" /></template>
                    Search</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/music"
                    ><template #icon="{size}"><Music :size="size" /></template>
                    Music</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/sports"
                    ><template #icon="{size}"><Volleyball :size="size" /></template>
                    Sports</SidebarMenuItem
                >
                <SidebarMenuItem path="/podcasts"
                    ><template #icon="{size}"><Mic :size="size" /></template>
                    Podcasts</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/local"
                    ><template #icon="{size}"><MapPin :size="size" /></template> By
                    Location</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/language"
                    ><template #icon="{size}"><Languages :size="size" /></template> By
                    Language</SidebarMenuItem
                >
            </ul>
        </div>
    </nav>
</template>
