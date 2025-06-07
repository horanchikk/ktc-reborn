<template>
  <div
    v-if="albums"
    class="w-screen flex flex-col gap-5 pt-3"
  >  
    <DynamicScroller
      :items="albums"
      :min-item-size="230"
      class="h-full"
      page-mode
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          :min-item-size="500"
          :size-dependencies="[
            item.title
          ]"
        >
          <GalleryItem :item="item" />
          <div class="h-[16px]" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller> 
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
