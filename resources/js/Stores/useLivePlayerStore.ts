import Station from '@/Interfaces/Station'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
    const radioInit = ref(false)
    const isPlaying = ref(false)
    const volume = ref(50)
    const station = ref<Station | null>(null)
    const audio = ref(new Audio())
    const loading = ref(false)
    const stopped = ref(true)

    audio.value.onwaiting = () => {
        loading.value = true
    }
    audio.value.onplaying = () => {
        loading.value = false
    }
    audio.value.onended = () => {
        isPlaying.value = false
    }

    function togglePlayPause() {
        if (isPlaying.value) {
            audio.value.pause()
        } else {
            audio.value.play()
        }
        isPlaying.value = !isPlaying.value
    }

    function turnOn() {
        audio.value.play()
        isPlaying.value = true
        stopped.value = false
    }

    function turnOff() {
        audio.value.pause()
        isPlaying.value = false
    }

    function setVolume(newVolume: number) {
        volume.value = newVolume
        audio.value.volume = newVolume / 100
    }

    function setRadio(s: Station) {
        radioInit.value = true
        loading.value = true
        if (audio.value.src !== s.url_resolved) {
            station.value = s
            audio.value.src = s.url_resolved
            audio.value.load()
            turnOn()
        } else {
            if (isPlaying.value) {
                turnOff()
            } else {
                turnOn()
            }
        }
    }

    function stop() {
        audio.value.pause()
        audio.value.src = ''
        station.value = null
        radioInit.value = false
        isPlaying.value = false
        stopped.value = true
        loading.value = false
    }

    return {
        isPlaying,
        radioInit,
        volume,
        loading,
        stopped,
        togglePlayPause,
        setVolume,
        setRadio,
        stop,
        station,
    }
})
