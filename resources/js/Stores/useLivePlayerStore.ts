import Station from '@/Interfaces/Station'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_ICON = '/images/soy-square.png'

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
            updateMediaMetadata(s)
            showNotification(s)
        } else {
            if (isPlaying.value) {
                turnOff()
            } else {
                turnOn()
                updateMediaMetadata(s)
            }
        }
    }

    function updateMediaMetadata(s: Station) {
        const applyMeta = (icon: string) => {
            const artwork = [
                { src: icon, sizes: '96x96', type: 'image/png' },
                { src: icon, sizes: '128x128', type: 'image/png' },
            ]
            const meta = { title: s.name, artist: 'Soystreams', artwork }
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata(meta)
                navigator.mediaSession.setActionHandler('play', turnOn)
                navigator.mediaSession.setActionHandler('pause', turnOff)
                navigator.mediaSession.setActionHandler('stop', stop)
            } else if ('webkitMediaSession' in navigator) {
                ;(navigator as any).webkitMediaSession.metadata = new (window as any).MediaMetadata(
                    meta,
                )
            }
        }
        const img = new Image()
        img.onload = () => applyMeta(s.favicon)
        img.onerror = () => applyMeta(DEFAULT_ICON)
        img.src = s.favicon
    }

    // fallback: use Web Notification API with proper permission & preload
    async function showNotification(s: Station) {
        if (!('Notification' in window)) return
        // request permission if needed
        let granted = Notification.permission === 'granted'
        if (!granted && Notification.permission === 'default') {
            granted = (await Notification.requestPermission()) === 'granted'
        }
        if (!granted) return

        // preload station favicon or fallback
        const icon = await new Promise<string>(resolve => {
            const img = new Image()
            img.onload = () => resolve(s.favicon)
            img.onerror = () => resolve(DEFAULT_ICON)
            img.src = s.favicon
        })
        new Notification(s.name, {
            body: s.url_resolved,
            icon,
            tag: s.stationuuid,
        })
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
