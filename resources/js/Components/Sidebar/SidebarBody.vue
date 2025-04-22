<script setup lang="ts">
import SidebarMenuItem from '@/Components/Sidebar/SidebarMenuItem.vue'
import { home } from '@/routes/home'
import { explore } from '@/routes/radio/explore'
import { music } from '@/routes/radio/music'
import { news } from '@/routes/radio/news'
import { sports } from '@/routes/radio/sports'
import { talk } from '@/routes/radio/talk'
import { search } from '@/routes/search'
import {
    Compass,
    House,
    Languages,
    MapPin,
    Mic,
    Music,
    Newspaper,
    Podcast,
    Search,
    Volleyball,
} from 'lucide-vue-next'
</script>

<template>
    <nav
        class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
    >
        <div
            class="hs-accordion-group flex w-full flex-col flex-wrap px-2 pb-0"
            data-hs-accordion-always-open
        >
            <ul class="space-y-1">
                <SidebarMenuItem :path="home().url" :active="$page.component === 'Home'">
                    <template #icon="{ size }"><House :size="size" /></template
                    >Home</SidebarMenuItem
                >
                <SidebarMenuItem
                    :path="`${search().url}?focus`"
                    :active="$page.component === 'Search'"
                    ><template #icon="{ size }"><Search :size="size" /></template>
                    Search</SidebarMenuItem
                >
                <SidebarMenuItem :path="explore().url" :active="$page.component === 'Explore'"
                    ><template #icon="{ size }"><Compass :size="size" /></template>
                    Explore</SidebarMenuItem
                >
                <SidebarMenuItem :path="music().url" :active="$page.url.startsWith('/radio/music')"
                    ><template #icon="{ size }"><Music :size="size" /></template>
                    Music</SidebarMenuItem
                >
                <SidebarMenuItem
                    :path="sports().url"
                    :active="$page.url.startsWith('/radio/sports')"
                    ><template #icon="{ size }"><Volleyball :size="size" /></template>
                    Sports</SidebarMenuItem
                >
                <SidebarMenuItem :path="news().url" :active="$page.url.startsWith('/radio/news')"
                    ><template #icon="{ size }"><Newspaper :size="size" /></template>
                    News</SidebarMenuItem
                >
                <SidebarMenuItem :path="talk().url" :active="$page.url.startsWith('/radio/talk')"
                    ><template #icon="{ size }"><Mic :size="size" /></template>
                    Talk</SidebarMenuItem
                >
                <SidebarMenuItem path="/podcasts"
                    ><template #icon="{ size }"><Podcast :size="size" /></template>
                    Podcasts</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/local"
                    ><template #icon="{ size }"><MapPin :size="size" /></template> By
                    Location</SidebarMenuItem
                >
                <SidebarMenuItem path="/radio/language"
                    ><template #icon="{ size }"><Languages :size="size" /></template> By
                    Language</SidebarMenuItem
                >
            </ul>
        </div>
    </nav>
</template>
