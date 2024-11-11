<template>
  <div class="flex flex-col w-screen h-screen bg-background-100 text-foreground">
    <main class="flex-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { updateColors } from '~/composables/useColors'

onMounted(() => {
  updateColors('#212121')
})
</script>
