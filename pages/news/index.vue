<template>
  <div class="w-full overflow-y-scroll flex flex-col p-2 gap-5">
    <div
      v-if="!newsList"
      class="w-full h-full"
    >
      <div
        v-for="i of Array.from({ length: 10 }).map((i, idx) => idx)"
        :key="i"
        :class="i === 0 ? 'mt-0 mb-4' : 'my-4'"
        class="w-full h-64 loading rounded-md opacity-30"
      />
    </div>
    <template v-else>
      <WallPost
        v-for="news in newsList"
        :key="news.id"
        :image="news.preview.length > 0 ? news.preview : `/nophoto.png`"
        :title="news.title"
        :description="news.description"
        :date="news.date"
        @click="navigateTo(`/news/${news.id}`)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { NewsList } from '~/types/news'

definePageMeta({
  name: 'Новости',
  middleware: ['user-only'],
})

const { $api } = useNuxtApp()
const newsList = ref<NewsList>()

onMounted(async () => {
  newsList.value = await $api.news.getPosts()
})
</script>
