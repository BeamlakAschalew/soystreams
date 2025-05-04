import { defineStore } from 'pinia'
import store from 'store2'
import { ref } from 'vue'
import type PodcastEpisode from '../Interfaces/PodcastEpisode'

export const useRecentEpisodeStore = defineStore('recentEpisode', () => {
    let initialRecents: Array<PodcastEpisode & { added_at: number }> = []
    try {
        const stored = store.get('recentEpisodes')
        initialRecents = stored ? JSON.parse(stored) : []
        initialRecents.sort((a, b) => b.added_at - a.added_at)
    } catch {
        initialRecents = []
    }
    const recents = ref<Array<PodcastEpisode & { added_at: number }>>(initialRecents)

    function saveRecents() {
        store.set('recentEpisodes', JSON.stringify(recents.value))
    }

    function addRecent(e: PodcastEpisode) {
        const now = Date.now()
        if (!isRecent(e.id)) {
            recents.value.unshift({ ...e, added_at: now })
        } else {
            const ex = recents.value.find(r => r.id === e.id)!
            ex.added_at = now
        }
        recents.value.sort((a, b) => b.added_at - a.added_at)
        saveRecents()
    }

    function isRecent(id: number): boolean {
        return recents.value.some(r => r.id === id)
    }

    return {
        recents,
        addRecent,
    }
})
