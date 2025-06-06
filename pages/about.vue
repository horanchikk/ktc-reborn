<template>
    <div class="flex flex-col justify-between items-center h-full py-2">
        <div />
        <div class="flex flex-col gap-4">
            <p class="text-center text-2xl text-semibold">Создано выпускниками колледжа</p>
            <div class="flex gap-4">
                <PersonCard 
                    name="Вадим Морозов"
                    nickname="@horanchikk"
                    avatar="vadim.png"
                    github="https://github.com/horanchikk"
                    vk="https://vk.com/kohima"
                    tg="https://t.me/horanchikk"
                />
                <PersonCard 
                    name="Никита Фомин"
                    nickname="@ethosa"
                    avatar="nikita.png"
                    github="https://github.com/ethosa"
                    vk="https://vk.com/akihayase"
                    tg="https://t.me/ethosa"
                />
            </div>
            <p class="text-center text-2xl text-semibold">с 💖</p>
        </div>
        <div class="flex flex-col justify-center gap-1">
            <p class="opacity-50 text-center" v-text="`Версия приложения - ${APP_VERSION}`" />
            <button 
                @click="checkUpdates" 
                :class="[
                    'h-[42px] w-[262px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-foreground hover:bg-foreground hover:text-black transition-colors',
                    { 'loading': isLoading }
                ]"
                :disabled="isLoading"
            >
                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                    <path d="M16 21h5v-5"/>
                </svg>
                {{ isLoading ? '' : 'Проверить обновления' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOTAStore } from '~/store/useOTAStore'
import { ref } from 'vue'

const { $config: { public: { APP_VERSION } } } = useNuxtApp()
const otaStore = useOTAStore()
const isLoading = ref(false)

async function checkUpdates() {
    isLoading.value = true
    await otaStore.checkForUpdates()
    isLoading.value = false
}

definePageMeta({
  name: 'О приложении',
  middleware: ['user-only'],
})
</script>

<style scoped>
.loading {
    cursor: wait;
    opacity: 0.7;
}
</style>