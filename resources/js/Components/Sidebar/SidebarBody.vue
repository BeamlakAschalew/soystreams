<script setup lang="ts">
import SidebarMenuItem from '@/Components/Sidebar/SidebarMenuItem.vue';
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
                <SidebarMenuItem path="/" active>Dashboard</SidebarMenuItem>
                <SidebarMenuItem path="/genres">Genre</SidebarMenuItem>
            </ul>
        </div>
    </nav>
</template>
