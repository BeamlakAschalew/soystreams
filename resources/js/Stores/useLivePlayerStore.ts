import Station from '@/Interfaces/Station'
import { click } from '@/routes/radio/click'
import Hls from 'hls.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRecentStationStore } from './useRecentStationStore'

const DEFAULT_ICON = '/images/soy-square.png'

export const usePlayerStore = defineStore('player', () => {
    const radioInit = ref(false)
    const isPlaying = ref(false)
    const volume = ref(50)
    const station = ref<Station | null>(null)
    const audio = ref(new Audio())
    const loading = ref(false)
    const stopped = ref(true)
    const hls = ref<Hls | null>(null)

    const recentStore = useRecentStationStore()

    audio.value.onwaiting = () => {
        loading.value = true
    }
    audio.value.onplaying = () => {
        loading.value = false
    }
    audio.value.onended = () => {
        isPlaying.value = false
        stopped.value = true
    }

    audio.value.onstalled = () => {
        console.log('Stream Stalled')
        handleStreamError()
    }

    audio.value.onerror = e => {
        const src = station.value?.url_resolved || station.value?.url || audio.value.src
        const pageIsHttps = window.location.protocol === 'https:'
        const streamIsHttp = src.startsWith('http:')
        const mediaErr = audio.value.error

        // MEDIA_ERR_SRC_NOT_SUPPORTED (code 4) is what Chrome/Firefox throw on mixed‐content
        const isMixedContentBlocked =
            pageIsHttps && streamIsHttp && mediaErr?.code === mediaErr?.MEDIA_ERR_SRC_NOT_SUPPORTED

        if (isMixedContentBlocked) {
            console.warn('Mixed‑content blocked HTTP stream, skipping retry:', src)
            stopped.value = true
            loading.value = false
            isPlaying.value = false
            return
        }

        console.log('Stream Error', e, mediaErr)
        handleStreamError()
    }

    // ignore retry if stream is http
    function handleStreamError() {
        if (hls.value) {
            // HLS.js has its own retry logic, handle specific HLS errors if needed
            console.warn('HLS stream error occurred.')
            // Optionally implement custom retry logic or error handling for HLS
        } else if (!stopped.value && station.value) {
            console.warn('Stream stopped unexpectedly. Retrying...')
            setTimeout(retryStream, 7000)
        }
    }

    function retryStream() {
        if (station.value && !hls.value) {
            // Only retry for non-HLS streams here
            if (station.value) {
                loading.value = true
                // fallback to plain url first, then resolved
                const plainUrl = station.value.url
                const resolvedUrl = station.value.url_resolved
                const currentSrc = audio.value.src
                const nextSrc =
                    currentSrc === plainUrl && resolvedUrl ? resolvedUrl : plainUrl || resolvedUrl
                if (nextSrc === resolvedUrl) {
                    console.warn('Falling back to station.url_resolved')
                }
                audio.value.src = nextSrc
                audio.value.load()
                if (isPlaying.value) {
                    audio.value
                        .play()
                        .then(() => {
                            isPlaying.value = true
                            loading.value = false
                        })
                        .catch(err => {
                            console.log(err)
                            loading.value = false
                            setTimeout(retryStream, 7000)
                        })
                }
            }
        }
        // HLS retry is often handled internally by hls.js
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
        recentStore.addRecent(s)
        fetch(`${click.url(s.stationuuid)}`, {
            method: 'GET',
            keepalive: true,
        }).catch(err => console.error(err))

        const streamUrl = s.url || s.url_resolved
        const isHls = streamUrl.endsWith('.m3u8')

        if (hls.value) {
            hls.value.destroy()
            hls.value = null
        }

        if (audio.value.src !== streamUrl) {
            station.value = s
            if (isHls && Hls.isSupported()) {
                console.log('Playing HLS stream:', streamUrl)
                hls.value = new Hls()
                hls.value.loadSource(streamUrl)
                hls.value.attachMedia(audio.value)
                hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
                    turnOn()
                })
                hls.value.on(Hls.Events.ERROR, (event, data) => {
                    console.error('HLS Error:', event, data)
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.warn('HLS network error, attempting to recover...')
                                hls.value?.startLoad()
                                break
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.warn('HLS media error, attempting to recover...')
                                hls.value?.recoverMediaError()
                                break
                            default:
                                // Cannot recover, destroy HLS instance
                                console.error('Unrecoverable HLS error, stopping playback.')
                                stop()
                                break
                        }
                    }
                    handleStreamError() // Call generic handler too if needed
                })
            } else if (isHls) {
                console.warn('HLS is not supported by this browser.')
                // Handle fallback or show error message
                loading.value = false
                // Maybe try playing directly if browser *might* support it?
                audio.value.src = streamUrl
                audio.value.load()
                turnOn()
            } else {
                console.log('Playing standard stream:', streamUrl)
                audio.value.src = streamUrl
                audio.value.load()
                turnOn()
            }
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
            body: s.name,
            icon,
            tag: s.stationuuid,
        })
    }

    function stop() {
        if (hls.value) {
            hls.value.destroy()
            hls.value = null
        }
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
