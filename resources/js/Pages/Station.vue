<script setup>
import MainLayout from '@/Layouts/MainLayout.vue'
import { ChevronDownIcon, ChevronUpIcon, HeartIcon, PlayIcon, ShareIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const showInfo = ref(false)

function toggleInfo() {
    showInfo.value = !showInfo.value
}

defineOptions({
    layout: MainLayout,
})
</script>

<template>
    <div class="mb-8 text-neutral-900 2xl:max-w-[80%] dark:text-neutral-50">
        <div
            class="relative flex w-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-green-200/80 via-green-200/40 to-transparent p-6 md:flex-row md:items-start md:p-8"
        >
            <!-- Logo section -->
            <div class="mb-6 flex justify-center md:mr-8 md:mb-0 md:flex-shrink-0">
                <div
                    class="flex h-44 w-44 items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-lg md:h-48 md:w-48 lg:h-52 lg:w-52"
                >
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-04-21%2011-47-23-SdMnE9UsFf1l76zGt6pLIjgtY3uwHF.png"
                        alt="Sheger FM Radio Logo"
                        class="max-h-full max-w-full object-contain"
                    />
                </div>
            </div>

            <!-- Station info section -->
            <div
                class="flex flex-col items-center text-center md:flex-1 md:items-start md:text-left"
            >
                <h1 class="text-3xl leading-tight font-bold text-gray-800">Sheger FM Radio</h1>
                <p class="mt-2 mb-6 text-gray-600">104.4K Favorites</p>

                <div class="mb-6 flex items-center justify-center gap-6 md:justify-start">
                    <button
                        class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800"
                    >
                        <PlayIcon class="h-6 w-6" />
                    </button>
                    <button class="text-gray-600 transition-colors hover:text-gray-900">
                        <HeartIcon class="h-6 w-6" />
                    </button>
                    <button class="text-gray-600 transition-colors hover:text-gray-900">
                        <ShareIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Toggle information button -->
                <button
                    @click="toggleInfo"
                    class="mx-auto flex items-center justify-center bg-transparent px-4 py-2 font-medium text-gray-600 transition-colors hover:text-gray-900 md:mx-0 md:justify-start"
                >
                    <span>{{ showInfo ? 'LESS INFORMATION' : 'MORE INFORMATION' }}</span>
                    <ChevronDownIcon v-if="!showInfo" class="ml-1 h-5 w-5" />
                    <ChevronUpIcon v-else class="ml-1 h-5 w-5" />
                </button>

                <!-- Divider -->
                <div class="my-4 h-px w-full bg-black/10"></div>

                <!-- Additional Information (Expandable) -->
                <div
                    v-if="showInfo"
                    class="w-full animate-[fadeIn_0.3s_ease-out_forwards] text-left"
                >
                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Location:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">
                            Addis Abeba, Ethiopia
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Genres:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">African Music</p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Description:</h3>
                        <p class="text-sm leading-relaxed text-gray-600">
                            ሸገር ኤፍ ኤም 102.1 ሬዲዮ መስከረም 23 ቀን 2000 ዓ.ም ሥራ የጀመረ የመዝናኛዉ የኢትዮጵያ ሬዲዮ ኤፍ ኤም
                            ሬዲዮ ጣቢያ ነዉ፡፡ ይህ ከኢትዮ ኢስበስ በ250 ኪሎ ሜትር ክልል ወሰጥ የሚሰራጭ እንዲሁም ሌሎች አገሮች
                            የሚቀበሉት ሬዲዮ ሥራ ልምድ ባላቸዉ ባለሙያዎች የተቋቋመዉ ሸገር ኤፍ ኤም 102.1 ሬዲዮ በአጭር ጊዜ ወሰጥ
                            በኢትዮጵያዊያን ዘንድ ተወዳጅነትን ለማትርፍ ችሏል፡፡ ሸገር 102.1 አዲስ የሬዲዮ አዘገጃጀት ወለድ አዲስ ቃና
                            ይዞ የቀረበ በህዝቡ የሚደገፍ ጣቢያ ላይ መሆኑን የሚጠቁም ጣቢያ ነዉ፡፡ የሸገር ዓላማ ከመገናኛት የተቀዳዳሽ
                            የትዕዛዝ ድምፅ ወሰጥ፡፡ ሥነ ምግባርን የጠበቀ ፕሮግራሞችን ወሰጥ፡፡ መከታት የሚያስፈልጋቸዉ (information
                            & entertainment) ሬዲዮ ጣቢያ ወሰጥ ነዉ፡፡ ጣቢያችን ለማዳመጥ ለህዝቦች ባጭሮችንና በመላዉም ሥነ ምግባር
                            ወላላዉም አገልግሎት ለመስጠት የሚጥጋጥና ለአከባቢዉ አሉታዊ ትልቅ ትኩረት የሰጠለት ሬዲዮ ጣቢያ ነዉ፡፡ ህዝቦም
                            ከሸገር ጋር ሆኖ ሸገር የእናንተ ነዉ! አዳምጡ ለሀሳለዎም ትችሉ!
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Twitter:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">@shegerfm</p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Language:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">Multilingual</p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Contact:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">
                            Audience Relations Radio Ethiopia Postal Box 654 Addis Ababa Ethiopia
                            +251111-275454
                        </p>
                    </div>

                    <div class="mb-4">
                        <h3 class="mb-1 font-semibold text-gray-800">Website:</h3>
                        <p class="text-[15px] leading-relaxed text-gray-600">
                            http://www.shegerfm.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
