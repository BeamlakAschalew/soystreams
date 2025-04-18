<script setup lang="ts">
import { Search } from 'lucide-vue-next'
</script>

<template>
    <header
        class="relative flex w-full flex-wrap bg-white py-3 text-sm sm:flex-nowrap sm:justify-start lg:hidden dark:bg-neutral-800"
    >
        <nav class="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between">
            <div class="flex w-full items-center justify-between">
                <div class="flex items-center justify-start">
                    <div class="pr-3 lg:hidden">
                        <button
                            type="button"
                            class="hs-collapse-toggle relative flex size-9 items-center justify-center gap-x-2 rounded-lg bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                            id="hs-navbar-example-collapse"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="hs-sidebar-collapsible-group"
                            aria-label="Toggle navigation"
                            data-hs-overlay="#hs-sidebar-collapsible-group"
                        >
                            <svg
                                class="hs-collapse-open:hidden size-8 shrink-0"
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
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <line x1="3" x2="21" y1="12" y2="12" />
                                <line x1="3" x2="21" y1="18" y2="18" />
                            </svg>
                            <svg
                                class="hs-collapse-open:block hidden size-4 shrink-0"
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
                            <span class="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                    <a
                        class="flex-none text-xl font-semibold focus:opacity-80 focus:outline-hidden dark:text-white"
                        href="#"
                        aria-label="Brand"
                    >
                        <img
                            class="h-full w-16"
                            src="../../../public/images/soy-short.png"
                            alt="Logo"
                        />
                    </a>
                </div>
                <div
                    class="relative flex size-9 items-center justify-center gap-x-2 rounded-lg bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                    id="search"
                >
                    <Search />
                </div>
            </div>
        </nav>
    </header>
</template>
