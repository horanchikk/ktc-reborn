<template>
  <div class="w-full overflow-y-scroll flex flex-col p-2 gap-5">
    <div
      v-if="newsList === null"
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
import { useDebug } from '~/store/useDebug'
import { useHeader } from '~/store/useHeader'

interface NewsList {
  id: number
  date: string
  title: string
  description: string
  preview: string
  type: string
}

definePageMeta({
  name: 'Новости',
  middleware: ['user-only'],
})

const api = useApi()
const debug = useDebug()
const header = useHeader()
const newsList = ref<NewsList | null>(null)

header.setAdditionalMenu([
  {
    name: 'Debug',
    icon: 'bug-report',
    action: () => debug.show(),
  },
  {
    name: 'Trigger error',
    icon: 'bug-report',
    action: () => {
      throw new Error('Test Error <3')
    },
  },
])

onMounted(async () => {
  newsList.value = await api.get('/news/')
})
</script>
