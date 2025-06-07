import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Открываем или создаём IndexedDB
  const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('image-cache-db', 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'url' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  /**
   * Возвращает blob-URL только после полной загрузки и кэширования.
   * Если в кэше есть Blob, сразу возвращает blob-URL.
   * Если нет, загружает картинку, сохраняет в IndexedDB и возвращает blob-URL.
   * При ошибке возвращает оригинальный URL.
   */
  async function getCachedUrl(url: string): Promise<string> {
    if (!url) return ''
    try {
      const db = await dbPromise
      // Проверяем наличие в кэше
      const cached = await new Promise<{ url: string; blob: Blob } | undefined>((resolve, reject) => {
        const tx = db.transaction('images', 'readonly')
        const store = tx.objectStore('images')
        const req = store.get(url)
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      })
      if (cached) {
        return URL.createObjectURL(cached.blob)
      }
      // Загружаем из сети
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      const blob = await response.blob()
      // Сохраняем в кэш
      try {
        const tx2 = db.transaction('images', 'readwrite')
        tx2.objectStore('images').put({ url, blob })
      } catch (e) {
        console.error('Ошибка при сохранении в кэш:', e)
      }
      return URL.createObjectURL(blob)
    } catch (e) {
      console.error('getCachedUrl error:', e)
      // Возвращаем оригинальный URL при любой ошибке
      return url
    }
  }

  // Делаем функцию доступной через useNuxtApp().$getCachedUrl
  nuxtApp.provide('getCachedUrl', getCachedUrl)
})

/**
Пример использования в компонентах:
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps<{ image: string }>()
const cachedSrc = ref('')
const { $getCachedUrl } = useNuxtApp()

onMounted(async () => {
  // функция вернёт только после загрузки
  cachedSrc.value = await $getCachedUrl(props.image)
})
</script>

<template>
  <NuxtImg
    :src="cachedSrc"
    alt="Возникла проблема с загрузкой фото, попробуйте позже."
    class="h-[200px] object-cover object-center"
    :height="200"
    custom
    :quality="10"
  />
</template>
*/
