<template>
  <!-- Forms -->
  <FormDebug />
  <FormOTA />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  head: [
    { name: 'meta', content: 'width=480, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,target-densitydpi=device-dpi, user-scalable=no' }
  ]
})
</script>

<style>
html, body {
  overscroll-behavior-x: none;
}
</style>
