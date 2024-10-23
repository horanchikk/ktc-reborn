<template>
  <div>
    this is settings page
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Настройки',
  middleware: ['user-only'],
})
</script>
