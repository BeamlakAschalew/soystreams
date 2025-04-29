import { defineStore } from 'pinia'
import store from 'store2'
import { ref } from 'vue'
import type Station from '../Interfaces/Station'

export const useRecentStationStore = defineStore('recentStation', () => {
    let initialRecents: Array<Station & { added_at: number }> = []
    try {
        const stored = store.get('recentStations')
        initialRecents = stored ? JSON.parse(stored) : []
        initialRecents.sort((a, b) => b.added_at - a.added_at)
    } catch {
        initialRecents = []
    }
    const recents = ref<Array<Station & { added_at: number }>>(initialRecents)

    function saveRecents() {
        store.set('recentStations', JSON.stringify(recents.value))
    }

    function addRecent(station: Station) {
        const now = Date.now()
        if (!isRecent(station.stationuuid)) {
            recents.value.unshift({ ...station, added_at: now })
        } else {
            const ex = recents.value.find(s => s.stationuuid === station.stationuuid)!
            ex.added_at = now
        }
        recents.value.sort((a, b) => b.added_at - a.added_at)
        saveRecents()
    }

    function isRecent(stationuuid: string): boolean {
        return recents.value.some(s => s.stationuuid === stationuuid)
    }

    return {
        recents,
        addRecent,
    }
})
