<script setup lang="ts">
import { usePlayerStore } from '@/Stores/useLivePlayerStore';
import { router } from '@inertiajs/vue3';
import { HSOverlay } from 'preline';
import { onMounted } from 'vue';
import SidebarBody from './SidebarBody.vue';
import SidebarFooter from './SidebarFooter.vue';
import SidebarHeader from './SidebarHeader.vue';
const playerStore = usePlayerStore();

function closeSidebarDrawer() {
    document.getElementById('hs-sidebar-collapsible-group-backdrop')?.remove();
}
onMounted(() => {
    // Initialize only the sidebar overlay
    const sidebarEl = document.getElementById('hs-sidebar-collapsible-group');
    if (sidebarEl) {
        const sidebar = new HSOverlay(sidebarEl);

        router.on('before', () => {
            sidebar.close();
        });
    }
});

// onMounted(() => {
//     router.on('success', () => {
//         closeSidebarDrawer();
//     });
// });
</script>

<template>
    <div
        id="hs-sidebar-collapsible-group"
        :class="[
            'hs-overlay fixed bottom-0 start-0 top-0 z-20 hidden h-full w-64 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 max-md:z-50 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0',
            playerStore.radioInit ? 'pb-20' : '',
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
