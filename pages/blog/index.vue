<template>
  <div class="w-full overflow-y-scroll flex flex-col p-2 gap-5 mb-[100px]">
    <!-- <NuxtLink to="/blog/new">
      <button class="absolute bottom-5 right-5 bg-primary hover:opacity-50 p-4 z-20 rounded-full flex items-center justify-center duration-150">
        <IPencil class="w-10 h-10" />
      </button>
    </NuxtLink> -->
    <div
      v-if="postList === null"
      class="w-full h-full"
    >
      <div
        v-for="i of Array.from({ length: 10 }).map((i, idx) => idx)"
        :key="i"
        :class="i === 0 ? 'mt-0 mb-4' : 'my-4'"
        class="w-full h-32 loading rounded-md opacity-30"
      />
    </div>
    <template v-else>
      <BlogPost
        v-for="(post, idx) in postList.items"
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
const postList = ref<{ items: PostList[] } | null>(null)

onMounted(async () => {
  postList.value = await api.get('/blogs/')
})
</script>
