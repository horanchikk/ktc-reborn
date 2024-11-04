<template>
  <p>here is messenger</p>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Сообщения',
  middleware: ['user-only'],
})
</script>
