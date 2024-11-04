<template>
  <div class="flex flex-col gap-2 text-foreground bg-background-100 rounded-lg overflow-hidden show">
    <img
      :src="$props.image"
      :alt="$props.title"
      class="h-[170px] object-cover object-center"
    >
    <div class="px-2 leading-none text-xl font-semibold">
      {{ $props.title }}
    </div>
    <div class="px-2 font-medium">
      {{ $props.description }}
    </div>
    <div class="w-full text-right -mt-2 px-2 pb-2 text-sm font-medium opacity-50">
      {{ $props.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  title?: string
  description?: string
  date?: string
}>()
</script>
