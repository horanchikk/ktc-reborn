<template>
  <div
    v-if="albums"
    class="w-screen flex flex-col gap-5 pt-3"
  >  
    <GalleryItem v-for="item in albums" :key="item.id" :item="item" />
  </div>
  <div
    v-else
    class="w-screen h-full flex justify-center items-center"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
</template>

<script setup lang="ts">
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { useGalleryApi } from '~/composables/useGalleryApi'
import { useLogger } from '~/composables/useLogger'

definePageMeta({
  name: 'Галерея',
  middleware: ['user-only'],
})

const albums = ref<object>()
const { gallery } = useGalleryApi()
const log = useLogger('Gallery')

onMounted(async () => {
  try {
    if (!gallery) {
      log.error('Модуль галереи не инициализирован')
      return
    }
    albums.value = await gallery.getAlbums()
  } catch (e) {
    log.error('Ошибка при получении альбомов:', e)
  }
})
</script>
