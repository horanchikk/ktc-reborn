<template>
  <div class="w-full flex flex-col">
    <input
      type="text"
      class="w-full text-2xl"
      placeholder="Заголовок записи"
    >
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Новая запись',
  layout: 'default',
  middleware: 'user-only',
})
</script>
