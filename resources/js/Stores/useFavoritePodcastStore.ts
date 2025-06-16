import { defineStore } from 'pinia'
import store from 'store2'
import { ref } from 'vue'
import type Podcast from '../Interfaces/Podcast'

export const useFavoritePodcastStore = defineStore('favoritePodcast', () => {
    let initialFavorites: Array<Podcast & { added_at: number }> = []
    try {
        const stored = store.get('favoritePodcasts')
        initialFavorites = stored ? JSON.parse(stored) : []
        initialFavorites.sort((a, b) => b.added_at - a.added_at)
    } catch {
        initialFavorites = []
    }
    const favorites = ref<Array<Podcast & { added_at: number }>>(initialFavorites)

    function saveFavorites() {
        store.set('favoritePodcasts', JSON.stringify(favorites.value))
    }

    function addFavorite(podcast: Podcast) {
        const now = Date.now()
        if (!isFavorited(podcast.id)) {
            favorites.value.unshift({ ...podcast, added_at: now })
            saveFavorites()
        }
    }

    function removeFavorite(podcastId: number) {
        const idx = favorites.value.findIndex(s => s.id === podcastId)
        if (idx !== -1) {
            favorites.value.splice(idx, 1)
            saveFavorites()
        }
    }

    function toggleFavorite(podcast: Podcast) {
        if (isFavorited(podcast.id)) {
            removeFavorite(podcast.id)
        } else {
            addFavorite(podcast)
        }
    }

    function isFavorited(podcastId: number): boolean {
        return favorites.value.some(s => s.id === podcastId)
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
    }
})
