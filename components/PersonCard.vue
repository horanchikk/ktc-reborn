<template>
    <div class="flex flex-col justify-center items-center">
        <Image :src="`/${$props.avatar}`" :height="200" rounded="full" class="mb-3 !w-[200px]" />
        <p class="text-xl font-semibold" v-text="$props.name" />
        <p class="text-2xl mb-2" v-text="$props.nickname" />
        <div class="flex justify-between px-8 w-full">
            <div v-if="$props.vk" @click="openURL($props.vk)">
                <IVk height="36" width="36" class="hover:text-blue-300 duration-150" />
            </div>
            <div v-if="$props.tg" @click="openURL($props.tg)">
                <ITg height="36" width="36" class="hover:text-[#29a0dc] duration-150" />
            </div>
            <div v-if="$props.github" @click="openURL($props.github)">
                <IGithub height="36" width="36" class="hover:text-black hover:text-opacity-50 duration-150" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Browser } from '@capacitor/browser'

defineProps<{
    name: string
    nickname: string
    avatar: string
    github: string
    vk: string
    tg: string
}>()

async function openURL(url: string) {
    await Browser.open({ url })
}
</script>
