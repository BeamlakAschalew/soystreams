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
            <nav
                class="h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
            >
                <div
                    class="hs-accordion-group flex w-full flex-col flex-wrap px-2 pb-0"
                    data-hs-accordion-always-open
                >
                    <ul class="space-y-1">
                        <li>
                            <a
                                class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                            >
                                <svg
                                    class="size-4"
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
                                        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                    />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Dashboard
                            </a>
                        </li>

                        <li class="hs-accordion" id="users-accordion">
                            <button
                                type="button"
                                class="hs-accordion-toggle focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                aria-expanded="true"
                                aria-controls="users-accordion-collapse-1"
                            >
                                <svg
                                    class="size-4"
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
                                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                    />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Users

                                <svg
                                    class="ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block dark:text-neutral-400"
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
                                    <path d="m18 15-6-6-6 6" />
                                </svg>

                                <svg
                                    class="ms-auto block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden dark:text-neutral-400"
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
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            <div
                                id="users-accordion-collapse-1"
                                class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                role="region"
                                aria-labelledby="users-accordion"
                            >
                                <ul
                                    class="hs-accordion-group space-y-1 ps-7 pt-1"
                                    data-hs-accordion-always-open
                                >
                                    <li
                                        class="hs-accordion"
                                        id="users-accordion-sub-1"
                                    >
                                        <button
                                            type="button"
                                            class="hs-accordion-toggle focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            aria-expanded="true"
                                            aria-controls="users-accordion-sub-1-collapse-1"
                                        >
                                            Sub Menu 1

                                            <svg
                                                class="ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block dark:text-neutral-400"
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
                                                <path d="m18 15-6-6-6 6" />
                                            </svg>

                                            <svg
                                                class="ms-auto block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden dark:text-neutral-400"
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
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </button>

                                        <div
                                            id="users-accordion-sub-1-collapse-1"
                                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                            role="region"
                                            aria-labelledby="users-accordion-sub-1"
                                        >
                                            <ul class="space-y-1 ps-2 pt-1">
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 3
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li
                                        class="hs-accordion"
                                        id="users-accordion-sub-2"
                                    >
                                        <button
                                            type="button"
                                            class="hs-accordion-toggle focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            aria-expanded="true"
                                            aria-controls="users-accordion-sub-2-collapse-1"
                                        >
                                            Sub Menu 2

                                            <svg
                                                class="ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block dark:text-neutral-400"
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
                                                <path d="m18 15-6-6-6 6" />
                                            </svg>

                                            <svg
                                                class="ms-auto block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden dark:text-neutral-400"
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
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </button>

                                        <div
                                            id="users-accordion-sub-2-collapse-1"
                                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                            role="region"
                                            aria-labelledby="users-accordion-sub-2"
                                        >
                                            <ul class="space-y-1 ps-2 pt-1">
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        href="#"
                                                    >
                                                        Link 3
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="hs-accordion" id="account-accordion">
                            <button
                                type="button"
                                class="hs-accordion-toggle focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                aria-expanded="true"
                                aria-controls="account-accordion-sub-1-collapse-1"
                            >
                                <svg
                                    class="size-4"
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
                                    <circle cx="18" cy="15" r="3" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                                    <path d="m21.7 16.4-.9-.3" />
                                    <path d="m15.2 13.9-.9-.3" />
                                    <path d="m16.6 18.7.3-.9" />
                                    <path d="m19.1 12.2.3-.9" />
                                    <path d="m19.6 18.7-.4-1" />
                                    <path d="m16.8 12.3-.4-1" />
                                    <path d="m14.3 16.6 1-.4" />
                                    <path d="m20.7 13.8 1-.4" />
                                </svg>
                                Account

                                <svg
                                    class="ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block dark:text-neutral-400"
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
                                    <path d="m18 15-6-6-6 6" />
                                </svg>

                                <svg
                                    class="ms-auto block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden dark:text-neutral-400"
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
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            <div
                                id="account-accordion-sub-1-collapse-1"
                                class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                role="region"
                                aria-labelledby="account-accordion"
                            >
                                <ul class="space-y-1 ps-7 pt-1">
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 3
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="hs-accordion" id="projects-accordion">
                            <button
                                type="button"
                                class="hs-accordion-toggle focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                aria-expanded="true"
                                aria-controls="projects-accordion-sub-1-collapse-1"
                            >
                                <svg
                                    class="size-4"
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
                                        d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"
                                    />
                                    <path
                                        d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"
                                    />
                                    <path d="M15 2v5h5" />
                                </svg>
                                Projects

                                <svg
                                    class="ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block dark:text-neutral-400"
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
                                    <path d="m18 15-6-6-6 6" />
                                </svg>

                                <svg
                                    class="ms-auto block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden dark:text-neutral-400"
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
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            <div
                                id="projects-accordion-sub-1-collapse-1"
                                class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                role="region"
                                aria-labelledby="projects-accordion"
                            >
                                <ul class="space-y-1 ps-7 pt-1">
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="focus:outline-hidden flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            href="#"
                                        >
                                            Link 3
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a
                                class="focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                            >
                                <svg
                                    class="size-4"
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
                                    <rect
                                        width="18"
                                        height="18"
                                        x="3"
                                        y="4"
                                        rx="2"
                                        ry="2"
                                    />
                                    <line x1="16" x2="16" y1="2" y2="6" />
                                    <line x1="8" x2="8" y1="2" y2="6" />
                                    <line x1="3" x2="21" y1="10" y2="10" />
                                    <path d="M8 14h.01" />
                                    <path d="M12 14h.01" />
                                    <path d="M16 14h.01" />
                                    <path d="M8 18h.01" />
                                    <path d="M12 18h.01" />
                                    <path d="M16 18h.01" />
                                </svg>
                                Calendar
                                <span
                                    class="ms-auto inline-flex items-center gap-x-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs text-gray-800 dark:bg-neutral-600 dark:text-neutral-200"
                                    >New</span
                                >
                            </a>
                        </li>
                        <li>
                            <a
                                class="focus:outline-hidden flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                            >
                                <svg
                                    class="size-4"
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
                                        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                                    />
                                    <path
                                        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                                    />
                                </svg>
                                Documentation
                            </a>
                        </li>
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
                    </ul>
                </div>
            </nav>
            <!-- End Body -->
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

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
</script>

<style scoped>
/* Drawer - highest z-index */
#hs-sidebar-collapsible-group {
    z-index: 20;
}
</style>
