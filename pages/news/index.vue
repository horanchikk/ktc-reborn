<template>
  <div class="w-full overflow-y-scroll flex flex-col p-2 gap-5">
    <div
      v-if="!newsList"
      class="w-full h-full flex items-center justify-center"
    >
      <ILoader
        class="w-16 h-16"
      />
    </div>
    <template v-else>
      <WallPost
        v-for="news in newsList"
        :key="news.id"
        :image="news.preview"
        :title="news.title"
        :description="news.description"
        :date="news.date"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const api = useApi()

const newsList = ref(null)

onMounted(async () => {
  newsList.value = await api.get('/news/')
})
</script>
