<template>
  <div
    v-if="photos"
    class="flex flex-col gap-2"
  >
    <h1
      class="text-2xl text-center pt-2 font-semibold"
      v-text="photos.title"
    />
    <div class="flex flex-col gap-5 p-1 mb-2">
      <Image
        v-for="(photo, idx) of photos.photos"
        :key="idx"
        :src="photo"
        :min-height="300"
        rounded="md"
      />
    </div>
  </div>
  <div
    v-else
    class="w-screen h-full flex justify-center items-center"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { params: { id } } = useRoute('gallery-id')
const photos = ref<object>()

definePageMeta({
  name: 'Фотографии',
  middleware: ['user-only'],
})

onMounted(async () => photos.value = await $api.gallery.getPhotos(id))
</script>
