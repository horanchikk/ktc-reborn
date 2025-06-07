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

  // Функция получения Blob URL из кэша или возвращения оригинальной ссылки
  async function getCachedUrl(url: string): Promise<string> {
    if (!url) return ''
    const db = await dbPromise
    return new Promise<string>((resolve) => {
      const tx = db.transaction('images', 'readonly')
      const store = tx.objectStore('images')
      const req = store.get(url)
      req.onsuccess = async () => {
        if (req.result) {
          // Уже в кэше — возвращаем blob URL
          const blob: Blob = req.result.blob
          resolve(URL.createObjectURL(blob))
        } else {
          // Нет в кэше — возвращаем оригинал и сохраняем
          resolve(url)
          try {
            const resp = await fetch(url)
            const blob = await resp.blob()
            const tx2 = db.transaction('images', 'readwrite')
            tx2.objectStore('images').put({ url, blob })
          } catch (e) {
            console.error('Failed to cache image:', e)
          }
        }
      }
      req.onerror = () => {
        // При ошибке возвращаем оригинальный URL
        resolve(url)
      }
    })
  }

  // Делаем функцию доступной через useNuxtApp().$getCachedUrl
  nuxtApp.provide('getCachedUrl', getCachedUrl)
})

// В компонентах используйте так:
/*
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps<{ image: string }>()
const cachedSrc = ref<string>(props.image)
const { $getCachedUrl } = useNuxtApp()

onMounted(async () => {
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