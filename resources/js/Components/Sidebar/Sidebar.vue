<script setup lang="ts">
import SidebarBody from './SidebarBody.vue';
import SidebarFooter from './SidebarFooter.vue';
import SidebarHeader from './SidebarHeader.vue';
</script>

<template>
    <div
        id="hs-sidebar-collapsible-group"
        class="hs-overlay z-60 fixed bottom-0 start-0 top-0 z-20 hidden h-full w-64 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
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
