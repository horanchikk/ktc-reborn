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
            <p class="opacity-50" v-text="`Версия приложения - ${APP_VERSION}`" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { $config: { public: { APP_VERSION } } } = useNuxtApp()

definePageMeta({
  name: 'О приложении',
  middleware: ['user-only'],
})
</script>

<style scoped>

</style>