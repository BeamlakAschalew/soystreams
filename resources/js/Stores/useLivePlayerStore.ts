import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
    const isPlaying = ref(false);
    const volume = ref(50);
    const audio = new Audio(
        'https://stream-155.zeno.fm/umguj2baxdctv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ1bWd1ajJiYXhkY3R2IiwiaG9zdCI6InN0cmVhbS0xNTUuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6ImdWa2czbkdFU1NlYlhHLWlWWllUNEEiLCJpYXQiOjE3NDIxOTY0NDQsImV4cCI6MTc0MjE5NjUwNH0.KdoRshWRPaDmyuZJ4RKFWNYGXXwuwC_W4uQwYi5I9Lg',
    );

    function togglePlayPause() {
        isPlaying.value ? audio.pause() : audio.play();
        isPlaying.value = !isPlaying.value;
    }

    function setVolume(newVolume: number) {
        volume.value = newVolume;
        audio.volume = newVolume / 100;
    }

    return { isPlaying, volume, togglePlayPause, setVolume };
});
