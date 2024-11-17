<template>
  <header
    class="w-full flex justify-between gap-5 bg-background-100 p-3 animate__animated animate__fadeInDown animate__faster z-10"
  >
    <ISandwich
      class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150"
      @click="sideBar.show()"
    />

    <div class="flex-auto flex items-center font-semibold">
      {{ $router.currentRoute.value.name }}
    </div>

    <IMoreVertical
      v-if="header.menu.length > 0"
      class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150 show"
      @click="show"
    />

    <div
      v-if="showMenu"
      class="fixed top-0 left-0 w-screen h-screen"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 animate__duration"
        :class="showAnim ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
      />
      <div
        class="absolute top-0 left-0 w-full h-full flex justify-end items-start z-40"
        :class="showAnim ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
        style="--animate-duration: 200ms"
        @click="hide"
      >
        <div class="m-3 w-fit flex flex-col divide-y-2 divide-stone-700 drop-shadow-lg">
          <button
            v-for="(item, idx) in header.menu"
            :key="idx"
            class="flex gap-4 p-3 items-center bg-background-100 hover:bg-stone-700 animate__animated animate__fadeInDown duration-150"
            :class="{
              'rounded-t-md': idx === 0,
              'rounded-b-md': idx === header.menu.length - 1,
            }"
            :style="`--animate-duration: ${(idx + 1) * 50}ms`"
            @click="item.action"
          >
            <img
              :src="`/icons/${item.icon}.svg`"
              class="w-6 h-6 opacity-50"
              :alt="item.icon"
            >
            <p v-text="item.name" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSideBar } from '~/store/useSideBar'
import { useHeader } from '~/store/useHeader'

const sideBar = useSideBar()
const header = useHeader()

const showMenu = ref(false)
const showAnim = ref(false)

function hide() {
  showAnim.value = false
  setTimeout(() => {
    showMenu.value = false
  }, 100)
}
function show() {
  showMenu.value = true
  showAnim.value = true
}
</script>
