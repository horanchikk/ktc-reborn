<template>
  <div class="flex flex-col w-screen h-screen bg-background-200 text-foreground">
    <main class="flex-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { updateColors } from '~/composables/useColors'

updateColors('#323232')
</script>
