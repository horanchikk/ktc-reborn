<template>
    <header class="w-full flex justify-between gap-5 bg-stone-800 p-3 animate__animated animate__fadeInDown animate__faster">
        <Icon @click="sideBar.show()" name="solar:hamburger-menu-outline" class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150" />
        <div class="flex-auto flex items-center font-semibold">
            UserName
        </div>
        <Icon name="basil:other-2-outline" class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150" />
    </header>
</template>

<script setup lang="ts">
import { useSideBar } from '~/store/useSideBar';

const sideBar = useSideBar()
</script>