<template>
  <div class="w-full overflow-y-scroll flex flex-col p-2 gap-5">
    <div
      v-if="postList === null"
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
      <BlogPost
        v-for="(post, idx) in postList"
        :key="idx"
        :avatar="post.avatar"
        :title="post.title"
        :raw_content="post.raw_content"
        :date="post.date"
        :author="post.author"
        :attachments="post.attachments"
      />
    </template>
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

definePageMeta({
  name: 'Блог',
  middleware: ['user-only'],
})

const api = useApi()
const postList = ref<PostList[] | null>(null)

onMounted(async () => {
  postList.value = await api.get('/blogs/')
})
</script>
