<template>
  <div class="flex flex-col gap-2 text-foreground bg-background-100 rounded-lg overflow-hidden show">
    <div class="flex gap-4 items-center m-2">
      <img
        :src="$props.avatar"
        :alt="`Avatar of ${$props.author}`"
        class="bg-white rounded-full"
      >
      <p v-text="$props.author" />
    </div>
    <div
      class="news-content px-2"
      v-html="$props.raw_content"
    />
    <div class="w-full text-right -mt-2 px-2 pb-2 text-sm font-medium opacity-50">
      {{ $props.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface PostList {
  title: string
  avatar: string
  author: string
  date: string
  raw_content: string
  attachments: []
}

defineProps<PostList>()
</script>
