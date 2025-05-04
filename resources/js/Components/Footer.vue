<script setup lang="ts">
import { about } from '@/routes/about'
</script>

<template>
    <footer class="border-t border-gray-200 py-6 dark:border-neutral-700">
        <div
            class="mx-10 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0"
        >
            <div class="text-sm text-gray-500 dark:text-gray-400">
                © {{ new Date().getFullYear() }} Soystreams. All Rights Reserved.
            </div>
            <div class="flex space-x-6">
                <Link
                    :href="about().url"
                    class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    About
                </Link>
                <a
                    href="https://t.me/soystreams"
                    target="_blank"
                    rel="noopener"
                    class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    Telegram
                </a>
            </div>
        </div>
    </footer>
</template>
