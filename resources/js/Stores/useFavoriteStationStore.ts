import type Station from '@/Interfaces/Station'
import { defineStore } from 'pinia'
import store from 'store2'
import { ref } from 'vue'

export const useFavoriteStationStore = defineStore('favoriteStation', () => {
    let initialFavorites: Array<Station & { added_at: number }> = []
    try {
        const stored = store.get('favoriteStations')
        initialFavorites = stored ? JSON.parse(stored) : []
        initialFavorites.sort((a, b) => b.added_at - a.added_at)
    } catch {
        initialFavorites = []
    }
    const favorites = ref<Array<Station & { added_at: number }>>(initialFavorites)

    function saveFavorites() {
        store.set('favoriteStations', JSON.stringify(favorites.value))
    }

    function addFavorite(station: Station) {
        const now = Date.now()
        if (!isFavorited(station.stationuuid)) {
            favorites.value.unshift({ ...station, added_at: now })
            saveFavorites()
        }
    }

    function removeFavorite(stationuuid: string) {
        const idx = favorites.value.findIndex(s => s.stationuuid === stationuuid)
        if (idx !== -1) {
            favorites.value.splice(idx, 1)
            saveFavorites()
        }
    }

    function toggleFavorite(station: Station) {
        if (isFavorited(station.stationuuid)) {
            removeFavorite(station.stationuuid)
        } else {
            addFavorite(station)
        }
    }

    function isFavorited(stationuuid: string): boolean {
        return favorites.value.some(s => s.stationuuid === stationuuid)
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
    }
})
