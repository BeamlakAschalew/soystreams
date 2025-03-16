<script setup lang="ts">
import { Heart, Play } from 'lucide-vue-next';
</script>

<template>
    <div
        id="livePlayer"
        class="fixed bottom-0 z-50 flex w-full flex-row items-center justify-between border-t-2 border-gray-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
    >
        <div
            id="imageTitle"
            class="flex flex-row items-center justify-center gap-4"
        >
            <img
                src="https://static.wixstatic.com/media/b24dd6_2ef687e27c8a41ac84e14a7ff8849f83~mv2.png/v1/fill/w_175,h_175,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/W_o%20Background.png"
                class="h-16"
                alt=""
            />
            <div id="radioTitle">Sheger</div>
        </div>
        <div id="playControl">
            <div
                id="playBtn"
                class="rounded-full bg-gray-800 p-3 dark:bg-gray-100"
            >
                <Play class="text-gray-100 dark:text-gray-800" :size="32" />
            </div>
        </div>
        <div id="trailing">
            <Heart />
        </div>
    </div>
</template>
