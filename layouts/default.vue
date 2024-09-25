<template>
  <div ref="globalWindow" class="flex flex-col w-screen h-screen bg-background-100 text-white overflow-y-hidden">
    <SideBar />
    <Header />

    <main class="flex-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { useSideBar } from '~/store/useSideBar';

const store = useSideBar()
const globalWindow = ref(null)
const {direction, lengthX} = useSwipe(globalWindow, {
    onSwipeEnd() {
        if (direction.value === 'right' && lengthX.value < -100)
            store.show()
    }
})</script>
