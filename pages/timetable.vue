<template>
  <p>here is timetable</p>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Расписание',
  middleware: ['user-only'],
})
</script>
