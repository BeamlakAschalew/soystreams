<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import Cookies from 'js-cookie'
import { debounce } from 'lodash'
import { Search } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

import RadioCard from '@/Components/RadioCard.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'

defineOptions({ layout: MainLayout })

const props = defineProps<{
    searched_stations: Station[]
    query: any
    no_input: boolean
    meta: { current_page: number; has_more: boolean }
}>()

const stations = ref<Station[]>([...props.searched_stations])
const page = ref(props.meta.current_page)
const hasMore = ref(props.meta.has_more)
const observerTarget = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

const searchQuery = ref(props.query.q)
const searchHistoryList = ref(getSearchHistory())

function loadMore() {
    if (!hasMore.value) return
    page.value++
    router.post(
        '/search',
        { q: searchQuery.value, page: page.value },
        {
            preserveState: true,
            preserveScroll: true,
            replace: false,
            only: ['searched_stations', 'meta'],
            onSuccess: page => {
                stations.value.push(...(page.props.searched_stations as Station[]))
                hasMore.value = (page.props.meta as { has_more: boolean }).has_more

                const url = new URL(window.location.href)
                url.searchParams.set('q', searchQuery.value)
                url.searchParams.delete('page')
                window.history.replaceState({}, '', url)
            },
        },
    )
}

onMounted(async () => {
    const io = new IntersectionObserver(
        ([e]) => {
            if (e.isIntersecting) loadMore()
        },
        { rootMargin: '200px' },
    )
    if (observerTarget.value) io.observe(observerTarget.value)
    // await nextTick()
    // searchInput.value?.focus()
})

const debouncedSearch = debounce(query => {
    router.get('/search', { q: query }, { preserveState: false, replace: true })
}, 300)

const searchFromHistory = (query: string): void => {
    searchQuery.value = query
    router.get('/search', { q: query }, { preserveState: false, replace: true })
}

const debouncedHistoryRegister = debounce(query => {
    const historyArray = getSearchHistory()
    if (query && !historyArray.includes(query)) {
        historyArray.push(query)
        if (historyArray.length > 10) historyArray.splice(0, historyArray.length - 10)
        Cookies.set('searchHistory', JSON.stringify(historyArray), { expires: 30 })
        searchHistoryList.value = historyArray
    }
}, 3000)

function getSearchHistory(): string[] {
    try {
        return JSON.parse(Cookies.get('searchHistory') || '[]').reverse()
    } catch {
        return []
    }
}

function clearSearchHistory(): void {
    Cookies.remove('searchHistory')
    searchHistoryList.value = []
}

function removeSearchHistory(query: string): void {
    const historyArray = getSearchHistory().filter(item => item !== query)
    Cookies.set('searchHistory', JSON.stringify(historyArray), { expires: 30 })
    searchHistoryList.value = historyArray
}

watch(searchQuery, newQuery => {
    debouncedSearch(newQuery)
    debouncedHistoryRegister(newQuery)
})
</script>

<template>
    <Head title="Search" />
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div class="relative">
            <input
                ref="searchInput"
                type="text"
                v-model="searchQuery"
                placeholder="Search for genres, stations, or podcasts"
                class="focus:ring-primary w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 text-neutral-900 placeholder-gray-500 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder-gray-400"
            />
            <Search
                class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
        </div>

        <div class="mt-6">
            <div v-if="searchHistoryList.length" class="mb-2 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    Recent Searches
                </h2>
                <button
                    @click="clearSearchHistory"
                    class="text-sm text-green-500 hover:cursor-pointer hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                >
                    CLEAR ALL
                </button>
            </div>
            <ul class="divide-y divide-gray-200 dark:divide-neutral-700">
                <li
                    v-for="searchItem in searchHistoryList"
                    :key="searchItem"
                    @click="searchFromHistory(searchItem)"
                    class="flex items-center justify-between border-b border-gray-300 py-2 hover:cursor-pointer dark:border-neutral-700"
                >
                    <span class="text-neutral-900 dark:text-neutral-50">{{ searchItem }}</span>
                    <button
                        @click.stop="removeSearchHistory(searchItem)"
                        class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        &times;
                    </button>
                </li>
            </ul>
        </div>

        <div v-if="!no_input" class="mt-6">
            <h2 class="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Radio Stations
            </h2>
            <div
                v-if="stations.length"
                class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4"
            >
                <RadioCard
                    v-for="station in stations"
                    :key="station.stationuuid"
                    :station="station"
                />
            </div>
            <div v-else>
                <p class="text-center text-gray-500 dark:text-gray-400">No results found.</p>
            </div>

            <!-- Load More button -->
            <div class="mt-4 flex items-start justify-start">
                <div
                    v-if="hasMore"
                    @click="loadMore"
                    class="px-4 py-2 font-semibold text-gray-800 hover:cursor-pointer hover:text-green-600 dark:text-gray-300"
                >
                    See More
                </div>
            </div>

            <!-- Sentinel for auto loading -->
            <!-- <div ref="observerTarget" class="h-8"></div> -->
        </div>
    </div>
</template>
