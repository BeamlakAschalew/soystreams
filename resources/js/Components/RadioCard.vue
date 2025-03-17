<script setup lang="ts">
import { Play } from 'lucide-vue-next';
</script>

<template>
    <div id="radioCard" class="w-fit">
        <div id="imageContainer" class="group relative">
            <div
                class="absolute bottom-0 h-12 w-40 rounded-bl-lg rounded-br-lg bg-gradient-to-t from-green-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                <div
                    class="absolute bottom-0 right-0 mb-1 mr-2 cursor-pointer rounded-full bg-gray-800 p-3 dark:bg-gray-900"
                >
                    <Play class="text-gray-100 dark:text-gray-200" :size="12" />
                </div>
            </div>
            <img
                src="https://static.wixstatic.com/media/b24dd6_2ef687e27c8a41ac84e14a7ff8849f83~mv2.png/v1/fill/w_175,h_175,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/W_o%20Background.png"
                class="h-40 w-40 cursor-pointer rounded-xl bg-white dark:bg-neutral-800"
                alt=""
            />
        </div>

        <div id="radioTitle" class="text-neutral-900 dark:text-neutral-50">
            Sheger FM
        </div>
    </div>
</template>
