<script setup lang="ts">
import SidebarBody from '@/Components/Sidebar/SidebarBody.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Home"></Head>
    <!-- Navigation Toggle -->
    <div class="py-16 text-center lg:hidden">
        <button
            type="button"
            class="shadow-2xs focus:outline-hidden inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-800 bg-gray-800 px-3 py-2 text-start align-middle text-sm font-medium text-white hover:bg-gray-950 focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-sidebar-collapsible-group"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-sidebar-collapsible-group"
        >
            Open
        </button>
    </div>
    <!-- End Navigation Toggle -->

    <!-- Sidebar -->
    <div
        id="hs-sidebar-collapsible-group"
        class="hs-overlay z-60 fixed bottom-0 start-0 top-0 hidden h-full w-64 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
    >
        <div class="relative flex h-full max-h-full flex-col">
            <!-- Header -->
            <header class="flex items-center justify-between gap-x-2 p-4">
                <a
                    class="focus:outline-hidden flex-none text-xl font-semibold text-black focus:opacity-80 dark:text-white"
                    href="#"
                    aria-label="Brand"
                    >Brand</a
                >

                <div class="-me-2 lg:hidden">
                    <!-- Close Button -->
                    <button
                        type="button"
                        class="focus:outline-hidden flex size-6 items-center justify-center gap-x-3 rounded-full border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700 dark:focus:text-neutral-200"
                        data-hs-overlay="#hs-sidebar-collapsible-group"
                    >
                        <svg
                            class="size-4 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        <span class="sr-only">Close</span>
                    </button>
                    <!-- End Close Button -->
                </div>
            </header>
            <!-- End Header -->

            <!-- Body -->
            <SidebarBody />
            <!-- End Body -->
            <footer
                class="mt-auto border-t border-gray-200 p-2 dark:border-neutral-700"
            >
                <div
                    class="hs-dropdown relative inline-flex w-full [--auto-close:inside] [--strategy:absolute]"
                >
                    <div id="themeToggler">
                        <button
                            type="button"
                            class="hs-dark-mode focus:outline-hidden block rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 hs-dark-mode-active:hidden dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            data-hs-theme-click-value="dark"
                        >
                            <span
                                class="group inline-flex size-9 shrink-0 items-center justify-center"
                            >
                                <svg
                                    class="size-4 shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                        <button
                            type="button"
                            class="hs-dark-mode focus:outline-hidden hidden rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 hs-dark-mode-active:block dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            data-hs-theme-click-value="light"
                        >
                            <span
                                class="group inline-flex size-9 shrink-0 items-center justify-center"
                            >
                                <svg
                                    class="size-4 shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M12 2v2"></path>
                                    <path d="M12 20v2"></path>
                                    <path d="m4.93 4.93 1.41 1.41"></path>
                                    <path d="m17.66 17.66 1.41 1.41"></path>
                                    <path d="M2 12h2"></path>
                                    <path d="M20 12h2"></path>
                                    <path d="m6.34 17.66-1.41 1.41"></path>
                                    <path d="m19.07 4.93-1.41 1.41"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <!-- End Sidebar -->
    <h1 class="py-4 text-black dark:text-white lg:ml-80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus velit,
        cumque obcaecati omnis maiores ad, praesentium tempore molestias
        consequuntur optio quidem, error illum voluptatum qui recusandae
        repellat quia sed quod aperiam eius harum asperiores modi perferendis
        incidunt. Eius, distinctio sequi repudiandae quidem beatae in modi quam
        reiciendis? Veritatis, quasi neque?
    </h1>
</template>

<style scoped>
/* Drawer - highest z-index */
#hs-sidebar-collapsible-group {
    z-index: 20;
}
</style>
