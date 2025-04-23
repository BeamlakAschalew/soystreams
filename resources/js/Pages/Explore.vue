<script setup lang="ts">
import MainLayout from '@/Layouts/MainLayout.vue'
import { computed, ref } from 'vue'
defineOptions({
    layout: MainLayout,
})

const activeTab = ref('basic')

// Initialize form data with default values
const formData = ref({
    // Basic parameters
    name: '',
    nameExact: false,
    country: '',
    countryExact: false,
    countrycode: '',
    state: '',
    stateExact: false,
    language: '',
    languageExact: false,
    tag: '',
    tagExact: false,
    tagList: '',

    // Technical parameters
    codec: '',
    bitrateMin: 0,
    bitrateMax: 1000000,
    has_geo_info: 'both',
    has_extended_info: 'both',
    is_https: 'both',

    // Geo parameters
    geo_lat: '',
    geo_long: '',
    geo_distance: '',

    // Result parameters
    order: 'name',
    reverse: false,
    offset: 0,
    limit: 100000,
    hidebroken: false,
})

// Country list for dropdown
const countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Japan', code: 'JP' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Spain', code: 'ES' },
    { name: 'Italy', code: 'IT' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Mexico', code: 'MX' },
    { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' },
    { name: 'Russia', code: 'RU' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Argentina', code: 'AR' },
    { name: 'New Zealand', code: 'NZ' },
]

// Language list for dropdown
const languages = [
    'English',
    'Spanish',
    'German',
    'French',
    'Portuguese',
    'Italian',
    'Dutch',
    'Russian',
    'Japanese',
    'Chinese',
    'Arabic',
    'Hindi',
    'Korean',
    'Swedish',
    'Norwegian',
    'Danish',
    'Finnish',
    'Polish',
    'Turkish',
    'Greek',
]

// Tag list for dropdown
const tags = [
    'Rock',
    'Pop',
    'Jazz',
    'Classical',
    'Hip Hop',
    'R&B',
    'Electronic',
    'Dance',
    'Country',
    'Folk',
    'Blues',
    'Metal',
    'Reggae',
    'Latin',
    'Alternative',
    'Indie',
    'Punk',
    'Soul',
    'Funk',
    'Ambient',
    'News',
    'Talk',
    'Sports',
    'Comedy',
    'Religious',
]

// For tag dropdown with custom input
const selectedTag = ref('')
const showCustomTagInput = ref(false)

// Handle tag selection
const handleTagSelect = () => {
    if (selectedTag.value === 'custom') {
        showCustomTagInput.value = true
        formData.value.tag = ''
    } else {
        showCustomTagInput.value = false
        formData.value.tag = selectedTag.value
    }
}

// Validate custom tag
const validateCustomTag = () => {
    if (!formData.value.tag) {
        selectedTag.value = ''
        showCustomTagInput.value = false
    }
}

// Format bitrate display
const formattedBitrateMax = computed(() => {
    return formData.value.bitrateMax === 1000000 ? 'No limit' : `${formData.value.bitrateMax} kbps`
})

// Handle form submission
const handleSubmit = () => {
    console.log('Search parameters:', formData.value)
    // Here you would typically make an API call with the formData
}

// Reset form to default values
const resetForm = () => {
    formData.value = {
        name: '',
        nameExact: false,
        country: '',
        countryExact: false,
        countrycode: '',
        state: '',
        stateExact: false,
        language: '',
        languageExact: false,
        tag: '',
        tagExact: false,
        tagList: '',
        codec: '',
        bitrateMin: 0,
        bitrateMax: 1000000,
        has_geo_info: 'both',
        has_extended_info: 'both',
        is_https: 'both',
        geo_lat: '',
        geo_long: '',
        geo_distance: '',
        order: 'name',
        reverse: false,
        offset: 0,
        limit: 100000,
        hidebroken: false,
    }
    selectedTag.value = ''
    showCustomTagInput.value = false
}
</script>
<template>
    <Head title="Explore" />
    <div class="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-950">
        <form @submit.prevent="handleSubmit">
            <!-- Tabs Navigation -->
            <div class="mb-6 flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    @click="activeTab = 'basic'"
                    :class="[
                        'rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none',
                        activeTab === 'basic'
                            ? 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400 border-b-2'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                >
                    <div class="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <span class="hidden sm:inline">Basic</span>
                    </div>
                </button>
                <button
                    type="button"
                    @click="activeTab = 'technical'"
                    :class="[
                        'rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none',
                        activeTab === 'technical'
                            ? 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400 border-b-2'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                >
                    <div class="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <span class="hidden sm:inline">Technical</span>
                    </div>
                </button>
                <button
                    type="button"
                    @click="activeTab = 'geo'"
                    :class="[
                        'rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none',
                        activeTab === 'geo'
                            ? 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400 border-b-2'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                >
                    <div class="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span class="hidden sm:inline">Geo</span>
                    </div>
                </button>
                <button
                    type="button"
                    @click="activeTab = 'results'"
                    :class="[
                        'rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none',
                        activeTab === 'results'
                            ? 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400 border-b-2'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                >
                    <div class="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        <span class="hidden sm:inline">Results</span>
                    </div>
                </button>
            </div>

            <!-- Basic Tab Content -->
            <div v-if="activeTab === 'basic'" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Station Name -->
                    <div class="space-y-2">
                        <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Station Name</label
                        >
                        <input
                            type="text"
                            id="name"
                            v-model="formData.name"
                            placeholder="Enter station name"
                            class="block w-full rounded-lg border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <div class="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="nameExact"
                                v-model="formData.nameExact"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="nameExact"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Exact match only
                            </label>
                        </div>
                    </div>

                    <!-- Country (Dropdown) -->
                    <div class="space-y-2">
                        <label
                            for="country"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Country</label
                        >
                        <div class="relative">
                            <select
                                id="country"
                                v-model="formData.country"
                                class="focus:ring-primary-500 focus:border-primary-500 w-full appearance-none rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            >
                                <option value="">Select a country</option>
                                <option
                                    v-for="country in countries"
                                    :key="country.code"
                                    :value="country.name"
                                >
                                    {{ country.name }}
                                </option>
                            </select>
                            <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
                            >
                                <svg
                                    class="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="countryExact"
                                v-model="formData.countryExact"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="countryExact"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Exact match only
                            </label>
                        </div>
                    </div>

                    <!-- Country Code -->
                    <div class="space-y-2">
                        <label
                            for="countrycode"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Country Code (ISO 3166-1)</label
                        >
                        <div class="relative">
                            <select
                                id="countrycode"
                                v-model="formData.countrycode"
                                class="focus:ring-primary-500 focus:border-primary-500 w-full appearance-none rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            >
                                <option value="">Select a country code</option>
                                <option
                                    v-for="country in countries"
                                    :key="country.code"
                                    :value="country.code"
                                >
                                    {{ country.code }} - {{ country.name }}
                                </option>
                            </select>
                            <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
                            >
                                <svg
                                    class="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- State -->
                    <div class="space-y-2">
                        <label
                            for="state"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >State</label
                        >
                        <input
                            type="text"
                            id="state"
                            v-model="formData.state"
                            placeholder="Enter state"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <div class="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="stateExact"
                                v-model="formData.stateExact"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="stateExact"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Exact match only
                            </label>
                        </div>
                    </div>

                    <!-- Language (Dropdown) -->
                    <div class="space-y-2">
                        <label
                            for="language"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Language</label
                        >
                        <div class="relative">
                            <select
                                id="language"
                                v-model="formData.language"
                                class="focus:ring-primary-500 focus:border-primary-500 w-full appearance-none rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            >
                                <option value="">Select a language</option>
                                <option
                                    v-for="language in languages"
                                    :key="language"
                                    :value="language"
                                >
                                    {{ language }}
                                </option>
                            </select>
                            <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
                            >
                                <svg
                                    class="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="languageExact"
                                v-model="formData.languageExact"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="languageExact"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Exact match only
                            </label>
                        </div>
                    </div>

                    <!-- Tag (Dropdown with Custom Input) -->
                    <div class="space-y-2">
                        <label
                            for="tag"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Tag</label
                        >
                        <div class="relative">
                            <div class="flex">
                                <select
                                    id="tag-select"
                                    v-model="selectedTag"
                                    @change="handleTagSelect"
                                    class="focus:ring-primary-500 focus:border-primary-500 w-full appearance-none rounded-l-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                >
                                    <option value="">Select or enter a tag</option>
                                    <option value="custom">Custom tag...</option>
                                    <option v-for="tag in tags" :key="tag" :value="tag">
                                        {{ tag }}
                                    </option>
                                </select>
                                <input
                                    v-if="showCustomTagInput"
                                    type="text"
                                    id="custom-tag"
                                    v-model="formData.tag"
                                    placeholder="Enter custom tag"
                                    class="focus:ring-primary-500 focus:border-primary-500 flex-1 rounded-r-md border border-l-0 border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    @blur="validateCustomTag"
                                />
                            </div>
                            <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
                                v-if="!showCustomTagInput"
                            >
                                <svg
                                    class="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id="tagExact"
                                v-model="formData.tagExact"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="tagExact"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Exact match only
                            </label>
                        </div>
                    </div>

                    <!-- Tag List -->
                    <div class="space-y-2">
                        <label
                            for="tagList"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Tag List (comma separated)</label
                        >
                        <input
                            type="text"
                            id="tagList"
                            v-model="formData.tagList"
                            placeholder="rock, pop, jazz"
                            class="block w-full rounded-lg border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            All tags in the list must match
                        </p>
                    </div>
                </div>
            </div>

            <!-- Technical Tab Content -->
            <div v-if="activeTab === 'technical'" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Codec -->
                    <div class="space-y-2">
                        <label
                            for="codec"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Codec</label
                        >
                        <input
                            type="text"
                            id="codec"
                            v-model="formData.codec"
                            placeholder="e.g. MP3, AAC"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                    </div>

                    <!-- Bitrate Min -->
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <label
                                for="bitrateMin"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Minimum Bitrate</label
                            >
                            <span class="text-sm text-gray-500 dark:text-gray-400"
                                >{{ formData.bitrateMin }} kbps</span
                            >
                        </div>
                        <input
                            type="range"
                            id="bitrateMin"
                            v-model.number="formData.bitrateMin"
                            min="0"
                            max="320"
                            step="1"
                            class="h-2 w-full cursor-pointer appearance-none rounded-lg dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                    </div>

                    <!-- Bitrate Max -->
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <label
                                for="bitrateMax"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Maximum Bitrate</label
                            >
                            <span class="text-sm text-gray-500 dark:text-gray-400">{{
                                formattedBitrateMax
                            }}</span>
                        </div>
                        <input
                            type="range"
                            id="bitrateMax"
                            v-model.number="formData.bitrateMax"
                            min="0"
                            max="1000"
                            step="10"
                            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                        />
                    </div>

                    <!-- Has Geo Info -->
                    <div class="space-y-2">
                        <label
                            for="has_geo_info"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Has Geo Info</label
                        >
                        <select
                            id="has_geo_info"
                            v-model="formData.has_geo_info"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                            <option value="both">Show All</option>
                            <option value="true">Only With Geo Info</option>
                            <option value="false">Only Without Geo Info</option>
                        </select>
                    </div>

                    <!-- Has Extended Info -->
                    <div class="space-y-2">
                        <label
                            for="has_extended_info"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Has Extended Info</label
                        >
                        <select
                            id="has_extended_info"
                            v-model="formData.has_extended_info"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                            <option value="both">Show All</option>
                            <option value="true">Only With Extended Info</option>
                            <option value="false">Only Without Extended Info</option>
                        </select>
                    </div>

                    <!-- Is HTTPS -->
                    <div class="space-y-2">
                        <label
                            for="is_https"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >HTTPS Stream</label
                        >
                        <select
                            id="is_https"
                            v-model="formData.is_https"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                            <option value="both">Show All</option>
                            <option value="true">Only HTTPS Streams</option>
                            <option value="false">Only HTTP Streams</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Geo Tab Content -->
            <div v-if="activeTab === 'geo'" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Latitude -->
                    <div class="space-y-2">
                        <label
                            for="geo_lat"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Latitude</label
                        >
                        <input
                            type="number"
                            id="geo_lat"
                            v-model="formData.geo_lat"
                            placeholder="-90.0 to 90.0"
                            min="-90"
                            max="90"
                            step="0.000001"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                    </div>

                    <!-- Longitude -->
                    <div class="space-y-2">
                        <label
                            for="geo_long"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Longitude</label
                        >
                        <input
                            type="number"
                            id="geo_long"
                            v-model="formData.geo_long"
                            placeholder="-180.0 to 180.0"
                            min="-180"
                            max="180"
                            step="0.000001"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                    </div>

                    <!-- Distance -->
                    <div class="space-y-2 md:col-span-2">
                        <label
                            for="geo_distance"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Maximum Distance (meters)</label
                        >
                        <input
                            type="number"
                            id="geo_distance"
                            v-model="formData.geo_distance"
                            placeholder="Distance in meters"
                            min="0"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Only stations within this distance from the specified coordinates will
                            be shown
                        </p>
                    </div>
                </div>

                <!-- Geo Search Help Box -->
                <div
                    class="mt-4 rounded-lg bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                    <div class="mb-2 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="text-primary-400 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 class="font-medium text-gray-900 dark:text-white">Geo Search Help</h3>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        To use geo search, you need to provide both latitude and longitude
                        coordinates. The distance parameter will limit results to stations within
                        the specified radius from these coordinates.
                    </p>
                </div>
            </div>

            <!-- Results Tab Content -->
            <div v-if="activeTab === 'results'" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Sort By -->
                    <div class="space-y-2">
                        <label
                            for="order"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Sort By</label
                        >
                        <select
                            id="order"
                            v-model="formData.order"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                            <option value="name">Name</option>
                            <option value="url">URL</option>
                            <option value="homepage">Homepage</option>
                            <option value="favicon">Favicon</option>
                            <option value="tags">Tags</option>
                            <option value="country">Country</option>
                            <option value="state">State</option>
                            <option value="language">Language</option>
                            <option value="votes">Votes</option>
                            <option value="codec">Codec</option>
                            <option value="bitrate">Bitrate</option>
                            <option value="lastcheckok">Last Check OK</option>
                            <option value="lastchecktime">Last Check Time</option>
                            <option value="clicktimestamp">Click Timestamp</option>
                            <option value="clickcount">Click Count</option>
                            <option value="clicktrend">Click Trend</option>
                            <option value="changetimestamp">Change Timestamp</option>
                            <option value="random">Random</option>
                        </select>
                    </div>

                    <!-- Sort Order -->
                    <div class="space-y-2">
                        <label
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Sort Order</label
                        >
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                id="reverse"
                                class="text-primary-500 focus focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                                v-model="formData.reverse"
                            />
                            <label
                                for="reverse"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                {{ formData.reverse ? 'Descending' : 'Ascending' }}
                            </label>
                        </div>
                    </div>

                    <!-- Offset -->
                    <div class="space-y-2">
                        <label
                            for="offset"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Offset</label
                        >
                        <input
                            type="number"
                            id="offset"
                            v-model.number="formData.offset"
                            min="0"
                            placeholder="Starting index"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Starting index for pagination
                        </p>
                    </div>

                    <!-- Limit -->
                    <div class="space-y-2">
                        <label
                            for="limit"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >Limit</label
                        >
                        <input
                            type="number"
                            id="limit"
                            v-model.number="formData.limit"
                            min="1"
                            placeholder="Maximum results"
                            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Maximum number of results to return
                        </p>
                    </div>

                    <!-- Hide Broken -->
                    <div class="space-y-2 md:col-span-2">
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                id="hidebroken"
                                v-model="formData.hidebroken"
                                class="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-200"
                            />
                            <label
                                for="hidebroken"
                                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Hide broken stations
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
                <button
                    type="button"
                    @click="resetForm"
                    class="focus:ring-primary-500 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    class="bg-primary-400 hover:bg-primary-500 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                    Search Stations
                </button>
            </div>
        </form>
    </div>

    <!-- Results Preview (Placeholder) -->
    <div
        class="rounded-xl bg-white p-6 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
    >
        <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Search Results</h2>
        <div
            class="flex items-center justify-center rounded-lg bg-gray-100 p-8 dark:bg-neutral-800"
        >
            <p class="text-center text-gray-500 dark:text-gray-400">
                Your search results will appear here.<br />
                Use the form above to search for radio stations.
            </p>
        </div>
    </div>
</template>

<style scoped>
/* Custom slider styling */
input[type='range'] {
    -webkit-appearance: none;
    height: 8px;
    border-radius: 4px;
    background: #e5e7eb;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #50c878;
    cursor: pointer;
}

input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #50c878;
    cursor: pointer;
    border: none;
}

.dark input[type='range'] {
    background: #4b5563;
}

/* Custom checkbox styling */
input[type='checkbox'] {
    accent-color: #50c878;
}

/* Custom focus styles */
input:focus,
select:focus {
    border-color: #50c878;
    box-shadow: 0 0 0 2px rgba(80, 200, 120, 0.2);
}

/* Custom select styling */
select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}

.dark select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}
</style>
