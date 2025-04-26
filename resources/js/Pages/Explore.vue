<script setup lang="ts">
import GridChannelsDisplay from '@/Components/GridChannelsDisplay.vue'
import Station from '@/Interfaces/Station'
import MainLayout from '@/Layouts/MainLayout.vue'
import { explore } from '@/routes/radio/explore'
import { router } from '@inertiajs/vue3'
import { ref } from 'vue'
defineOptions({
    layout: MainLayout,
})

const props = defineProps<{
    stations: Station[]
    no_input: boolean

    meta: {
        current_page: number
        has_more: boolean
        filters: any
        countries: Array<any>
        languages: Array<any>
        tags: Array<any>
    }
}>()

const formData = ref({
    name: props.meta.filters.name,
    nameExact: props.meta.filters.nameExact,
    country: props.meta.filters.country,
    countryExact: props.meta.filters.countryExact,
    language: props.meta.filters.language,
    languageExact: props.meta.filters.languageExact,
    tag: props.meta.filters.tag,
    tagExact: props.meta.filters.tagExact,

    order: props.meta.filters.order ?? 'votes',
    reverse: props.meta.filters.reverse.value ?? true,
})

// For tag dropdown with custom input
const selectedTag = ref('')
const showCustomTagInput = ref(false)

const handleTagSelect = () => {
    if (selectedTag.value === 'custom') {
        showCustomTagInput.value = true
        formData.value.tag = ''
    } else {
        showCustomTagInput.value = false
        formData.value.tag = selectedTag.value
    }
}

const validateCustomTag = () => {
    if (!formData.value.tag) {
        selectedTag.value = ''
        showCustomTagInput.value = false
    }
}

const handleSubmit = () => {
    router.get(explore().url, formData.value, {
        preserveState: false,
        replace: true,
        preserveScroll: true,
    })
}

const resetForm = () => {
    formData.value = {
        name: '',
        nameExact: false,
        country: '',
        countryExact: false,
        language: '',
        languageExact: false,
        tag: '',
        tagExact: false,
        order: 'votes',
        reverse: true,
    }
    selectedTag.value = ''
    showCustomTagInput.value = false
}

const local_stations = ref<Station[]>([...props.stations])
const page = ref(props.meta.current_page)
const hasMore = ref(props.meta.has_more)

function loadMore() {
    if (!hasMore.value) return
    page.value++
    router.get(
        explore().url,
        { ...formData.value, page: page.value },
        {
            preserveState: true,
            preserveScroll: true,
            replace: false,
            only: ['stations', 'meta'],
            onSuccess: page => {
                local_stations.value.push(...(page.props.stations as Station[]))
                hasMore.value = (page.props.meta as { has_more: boolean }).has_more
            },
        },
    )
}
</script>
<template>
    <Head title="Explore" />
    <div class="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-950">
        <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
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
                                    v-for="country in meta.countries"
                                    :key="country.iso_3166_1"
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
                                    v-for="language in meta.languages"
                                    :key="language"
                                    :value="language.name"
                                >
                                    {{ language.name }}
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
                                    <option v-for="tag in meta.tags" :key="tag" :value="tag.name">
                                        {{ tag.name }}
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
                </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
                <button
                    type="button"
                    @click="resetForm"
                    class="focus:ring-primary-500 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                >
                    Reset
                </button>
                <button
                    @click="handleSubmit"
                    class="bg-primary hover:bg-primary-400 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-black shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                    Search Stations
                </button>
            </div>
        </form>
    </div>

    <!-- Results Preview (Placeholder) -->
    <div class="flex rounded-lg bg-white p-4 dark:bg-neutral-950">
        <p v-if="no_input" class="text-center text-gray-500 dark:text-gray-400">
            Your search results will appear here.<br />
            Use the form above to search for radio stations.
        </p>

        <GridChannelsDisplay
            v-else
            class="self-start justify-self-start"
            :stations="local_stations"
            :current-page="1"
            :has-more="hasMore"
            :no-input="no_input"
            title="Search Results"
            :load-more="loadMore"
        />
    </div>
</template>

<style scoped>
/* Custom slider styling */
input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
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
