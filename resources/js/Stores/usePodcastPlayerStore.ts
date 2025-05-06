import Podcast from '@/Interfaces/Podcast'
import { usePlayerStore } from '@/Stores/useLivePlayerStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import PodcastEpisode from '../Interfaces/PodcastEpisode'
const DEFAULT_ICON = '/images/soy-square.png'

export const usePodcastPlayerStore = defineStore('podcastPlayer', () => {
    const podcastInit = ref(false)
    const isPlaying = ref(false)
    const volume = ref(50)
    const episode = ref<PodcastEpisode | null>(null)
    const podcast = ref<Podcast | null>(null)
    const podcastId = ref<number | null>(null)
    const audio = ref(new Audio())
    const loading = ref(false)
    const stopped = ref(true)
    const currentTime = ref(0)
    const duration = ref(0)
    const playerStore = usePlayerStore()

    // const recentStore = useRecentStationStore()

    audio.value.onwaiting = () => {
        loading.value = true
    }
    audio.value.onplaying = () => {
        loading.value = false
    }
    audio.value.onloadedmetadata = () => {
        duration.value = audio.value.duration
    }
    audio.value.ontimeupdate = () => {
        currentTime.value = audio.value.currentTime
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
        const src = episode.value?.enclosureUrl || audio.value.src
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

        // all other errors (including HTTP streams on HTTP pages)
        console.log('Stream Error', e, mediaErr)
        handleStreamError()
    }

    // ignore retry if stream is http

    function handleStreamError() {
        if (!stopped.value && episode.value) {
            console.warn('Stream stopped unexpectedly. Retrying...')
            setTimeout(retryStream, 7000)
        }
    }

    function retryStream() {
        if (episode.value) {
            loading.value = true
            // fallback to plain url first, then resolved
            const plainUrl = episode.value.enclosureUrl
            const currentSrc = audio.value.src
            const nextSrc = currentSrc === plainUrl ? plainUrl : plainUrl
            if (nextSrc === plainUrl) {
                console.warn('Falling back to episode.audioUrl')
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

    function setEpisode(podcastEpisode: PodcastEpisode, p: Podcast) {
        podcastInit.value = true
        episode.value = podcastEpisode
        podcast.value = p
        loading.value = true
        if (playerStore.radioInit) {
            playerStore.stop()
        }
        // recentStore.addRecent(e)
        audio.value.src = podcastEpisode.enclosureUrl
        audio.value.load()
        turnOn()
        updateMediaMetadata(podcastEpisode)
        showNotification(podcastEpisode)
    }

    function updateMediaMetadata(p: PodcastEpisode) {
        const applyMeta = (icon: string) => {
            const artwork = [
                { src: icon, sizes: '96x96', type: 'image/png' },
                { src: icon, sizes: '128x128', type: 'image/png' },
            ]
            const meta = { title: p.title, artist: p.feedTitle, artwork }
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
        img.onload = () => applyMeta(p.image || p.feedImage)
        img.onerror = () => applyMeta(DEFAULT_ICON)
        img.src = p.image || p.feedImage
    }

    function seek(to: number) {
        if (audio.value.src) {
            audio.value.currentTime = to
        }
    }

    // fallback: use Web Notification API with proper permission & preload
    async function showNotification(p: PodcastEpisode) {
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
            img.onload = () => resolve(p.image || p.feedImage)
            img.onerror = () => resolve(DEFAULT_ICON)
            img.src = p.image || p.feedImage
        })
        new Notification(p.title, {
            body: p.title,
            icon,
            tag: p.id.toString(),
        })
    }

    function stop() {
        audio.value.pause()
        audio.value.src = ''
        episode.value = null
        podcastInit.value = false
        isPlaying.value = false
        stopped.value = true
        loading.value = false
    }

    return {
        isPlaying,
        podcastInit,
        volume,
        loading,
        stopped,
        currentTime,
        duration,
        togglePlayPause,
        setVolume,
        setEpisode,
        seek,
        stop,
        episode,
        podcast,
        podcastId,
    }
})
