<template>
  <div
    v-if="albums"
    class="w-screen h-full flex flex-col gap-5 mt-3"
  >
    <NuxtLink
      v-for="album in albums"
      :key="album.id"
      :to="`/gallery/${album.id}`"
      class="bg-background-100 bg-opacity-80 rounded-md mx-1 select-none hover:opacity-60 duration-150 transition-all"
    >
      <img
        class="w-full rounded-t-md"
        :src="album.preview"
        alt="Фото"
      >
      <p
        class="text-center text-sm font-semibold my-3"
        v-text="album.title"
      />
      <p
        class="text-xs text-right mb-2 pr-2"
        v-text="album.date"
      />
    </NuxtLink>
  </div>
  <div
    v-else
    class="w-screen h-full flex justify-center items-center"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
</template>

<script setup lang="ts">
import { ApiModules } from '~/repository/api'

definePageMeta({
  name: 'Галерея',
  middleware: ['user-only'],
})

const albums = ref<null | object>(null)
onMounted(async () => albums.value = await ApiModules.gallery.getAlbums())
</script>
