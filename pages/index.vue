<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ILoader class="w-6 h-6 text-foreground opacity-75 group-hover:opacity-100" />
  </div>
</template>

<script setup lang="ts">
import { SplashScreen } from '@capacitor/splash-screen';

definePageMeta({
  layout: 'none',
})

SplashScreen.hide()
navigateTo('/auth')
</script>
