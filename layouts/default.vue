<template>
  <div
    ref="globalWindow"
    class="text-foreground flex flex-col w-screen h-screen bg-background-200 overflow-y-hidden select-none"
  >
    <BaseSideBar />
    <BaseHeader />

    <main class="flex-auto overflow-y-scroll">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { updateColors } from '~/composables/useColors'
import { useSideBar } from '~/store/useSideBar'

const store = useSideBar()
const globalWindow = ref(null)
const { direction, lengthX } = useSwipe(globalWindow, {
  onSwipeEnd() {
    if (direction.value === 'right' && lengthX.value < -100) store.show()
  },
})

updateColors('#212121')
</script>
