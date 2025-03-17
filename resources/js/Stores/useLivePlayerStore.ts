import Station from '@/Interfaces/Station';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
    const radioInit = ref(false);
    const isPlaying = ref(false);
    const volume = ref(50);
    const station = ref<Station | null>(null);
    const audio = ref(new Audio());

    function togglePlayPause() {
        if (isPlaying.value) {
            audio.value.pause();
        } else {
            audio.value.play();
        }
        isPlaying.value = !isPlaying.value;
    }

    function turnOn() {
        audio.value.play();
        isPlaying.value = true;
    }

    function turnOff() {
        audio.value.pause();
        isPlaying.value = false;
    }

    function setVolume(newVolume: number) {
        volume.value = newVolume;
        audio.value.volume = newVolume / 100;
    }

    function setRadio(s: Station) {
        radioInit.value = true;
        if (audio.value.src !== s.url_resolved) {
            station.value = s;
            audio.value.src = s.url_resolved;
            audio.value.load();
            turnOn();
        } else {
            if (isPlaying.value) {
                turnOff();
            } else {
                turnOn();
            }
        }
    }

    return {
        isPlaying,
        radioInit,
        volume,
        togglePlayPause,
        setVolume,
        setRadio,
        station,
    };
});
