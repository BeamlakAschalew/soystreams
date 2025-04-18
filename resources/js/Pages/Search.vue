<script setup lang="ts">
import RadioCard from '@/Components/RadioCard.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import { router } from '@inertiajs/vue3'
import Cookies from 'js-cookie'
import { debounce } from 'lodash'
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps<{ searched_stations: Station[]; query: any; no_input: boolean }>()

defineOptions({ layout: MainLayout })

const searchQuery = ref(props.query.q)
const searchHistoryList = ref(getSearchHistory())

const debouncedSearch = debounce(query => {
    router.get('/search', { q: query }, { preserveState: true, replace: true })
}, 300)

const searchFromHistory = (query: string): void => {
    searchQuery.value = query
    router.get('/search', { q: query }, { preserveState: true, replace: true })
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
    <div class="mb-8 2xl:max-w-[80%]">
        <div class="relative">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search for genres, stations, audiobooks, or podcasts"
                class="focus:ring-primary w-full rounded-full border border-gray-300 px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            />
            <Search class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        <div class="mt-6">
            <div v-if="searchHistoryList.length" class="mb-2 flex items-center justify-between">
                <h2 class="text-lg font-semibold">Recent Searches</h2>
                <button
                    @click="clearSearchHistory"
                    class="text-sm text-green-500 hover:cursor-pointer hover:text-green-900"
                >
                    CLEAR ALL
                </button>
            </div>
            <ul class="divide-y divide-gray-200">
                <li
                    v-for="searchItem in searchHistoryList"
                    :key="searchItem"
                    @click="searchFromHistory(searchItem)"
                    class="flex items-center justify-between border-b border-gray-300 py-2 hover:cursor-pointer"
                >
                    <span>{{ searchItem }}</span>
                    <button
                        @click="removeSearchHistory(searchItem)"
                        class="text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </li>
            </ul>
        </div>

        <div v-if="!no_input" class="mt-6">
            <h2 class="mb-2 text-lg font-semibold">Radio Stations</h2>
            <div
                v-if="props.searched_stations.length"
                class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4"
            >
                <RadioCard
                    v-for="station in props.searched_stations"
                    :key="station.stationuuid"
                    :station="station"
                    class="max-w-[150px]"
                />
            </div>
            <div v-else>
                <p class="text-center text-gray-500">No results found.</p>
            </div>
        </div>
    </div>
</template>
