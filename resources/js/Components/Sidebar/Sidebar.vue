<script setup lang="ts">
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import SidebarBody from './SidebarBody.vue'
import SidebarFooter from './SidebarFooter.vue'
import SidebarHeader from './SidebarHeader.vue'
const playerStore = usePlayerStore()
</script>

<template>
    <div
        id="hs-sidebar-collapsible-group"
        :class="[
            'hs-overlay hs-overlay-open:translate-x-0 fixed start-0 top-0 bottom-0 z-20 hidden h-full w-64 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] max-md:z-50 lg:end-auto lg:bottom-0 lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800',
            playerStore.radioInit ? 'pb-23' : '',
        ]"
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
    >
        <div class="relative flex h-full max-h-full flex-col">
            <SidebarHeader />
            <SidebarBody />
            <SidebarFooter />
        </div>
    </div>
</template>
