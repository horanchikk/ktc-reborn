<template>
  <p>here is profile page</p>
</template>

<script setup lang="ts">
// import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Профиль',
  middleware: ['user-only'],
})
</script>
