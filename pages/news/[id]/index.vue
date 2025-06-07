<template>
  <div
    ref="page"
    class="flex flex-col gap-2 p-2 overflow-y-auto bg-background-200"
  >
    <div
      ref="header"
      class="right-0 left-0 top-0 fixed"
    >
      <Image 
        v-if="news"
        :src="news.preview.length > 0 ? news.preview : '/nophoto.png'"
        class="w-full absolute -z-10"
        :height="imageHeight"
      />
      <div
        v-else
        class="w-full object-cover object-center absolute -z-10 loading"
        :style="`height: ${imageHeight}px`"
      />
      <div
        class="fixed top-0 left-0 flex w-full flex-col"
        :style="`
          height: ${imageHeight}px;
          background: linear-gradient(to bottom, #212121, rgba(33,33,33,${blur/10.5}), #212121)
        `"
      >
        <div
          ref="blurry"
          :class="`w-full h-full transition-all`"
          :style="`backdrop-filter: blur(${blur}px); background-color: rgba(33,33,33,0);`"
        >
          <IArrowLeftAlt
            class="absolute top-0 left-2 w-12 h-12 hover:opacity-50 duration-150 z-20 animate__animated animate__fadeInLeft animate__duration"
            :style="direction === 'right' && lengthX < -100 ? `left: 20px;` : ''"
            @click="$router.back()"
          />
          <div
            v-if="news"
            class="font-semibold absolute bottom-2.5 truncate w-full pr-4 show"
            :style="`padding-left: ${padLeft}px; font-size: ${textSize}px; line-height: ${lineHeight}px; ${titleStyles};`"
            v-text="news.title"
          />
        </div>
      </div>
    </div>
    <div
      v-if="news"
      class="flex flex-col min-h-screen h-[2000px] news-content overflow-y-hidden"
      :style="`padding-top: ${headerHeightMax}px`"
    >
      <template v-for="(node, index) in processedContent" :key="index">
        <template v-if="node.type === 'text'">
          <span v-html="node.content"></span>
        </template>
        <template v-else-if="node.type === 'image'">
          <Image
            :src="`https://hapticx.ru/api/media/proxy/file?link=${node.src}`"
            :height="node.height > 300 ? 300 : node.height"
            rounded="md"
            class="my-4"
          />
        </template>
        <template v-else-if="node.type === 'audio'">
          <audio controls class="w-full my-4">
            <source :src="`https://hapticx.ru/api/media/proxy/file?link=${node.src}`" :type="node.audioType">
            Ваш браузер не поддерживает аудио элемент.
          </audio>
        </template>
      </template>
    </div>
    <div
      v-else
      class="flex flex-col min-h-screen items-center justify-center news-content"
      :style="`padding-top: ${headerHeightMax}px`"
    >
      <ILoader class="w-10 h-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll, useSwipe } from '@vueuse/core'
import type { News } from '~/types/news'

definePageMeta({
  middleware: ['user-only'],
  layout: 'news',
  name: 'Переходим в пост...'
})

const headerHeightMax = 275
const headerHeightMin = 50
const backButtonHeight = 48
const titleLeftPaddingMin = 10

const imageHeight = ref(headerHeightMax)
const blur = ref(0)
const page = ref(null)
const padLeft = ref(titleLeftPaddingMin)
const textSize = ref(24)
const lineHeight = ref(32)
const titleStyles = ref('')

const route = useRoute()
const { $api } = useNuxtApp()
const news = ref<News>()

const { y } = useWindowScroll({ behavior: 'smooth' })
const { direction, lengthX } = useSwipe(page, {
  onSwipeEnd() {
    if (direction.value === 'right' && lengthX.value < -100) useRouter().back()
  },
})

const processedContent = computed(() => {
  if (!news.value?.content) return []
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(news.value.content, 'text/html')
  const nodes: Array<{ 
    type: 'text' | 'image' | 'audio', 
    content?: string, 
    src?: string, 
    width?: number, 
    height?: number,
    audioType?: string 
  }> = []
  
  // Рекурсивно обрабатываем все узлы
  const processNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent?.trim()) {
        nodes.push({ type: 'text', content: node.textContent })
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      if (element.tagName.toLowerCase() === 'img') {
        nodes.push({
          type: 'image',
          src: element.getAttribute('src') || '',
          width: Number.parseInt(element.getAttribute('width') || '400'),
          height: Number.parseInt(element.getAttribute('height') || '300')
        })
      } else if (element.tagName.toLowerCase() === 'audio') {
        const source = element.querySelector('source')
        if (source) {
          const src = source.getAttribute('src') || ''
          // Извлекаем URL из параметра link
          const urlMatch = src.match(/link=([^&]+)/)
          const audioUrl = urlMatch ? decodeURIComponent(urlMatch[1]) : src
          
          nodes.push({
            type: 'audio',
            src: audioUrl,
            audioType: source.getAttribute('type') || 'audio/ogg'
          })
        }
      } else {
        Array.from(node.childNodes).forEach(processNode)
      }
    }
  }
  
  Array.from(doc.body.childNodes).forEach(processNode)
  return nodes
})

watch(y, (val) => {
  imageHeight.value = Math.max(headerHeightMin, headerHeightMax - val)
  blur.value = Math.ceil((headerHeightMax - imageHeight.value) / 25)
  if (imageHeight.value > backButtonHeight * 2) {
    padLeft.value = titleLeftPaddingMin
    textSize.value = 24
    lineHeight.value = 32
  }
  else {
    padLeft.value = titleLeftPaddingMin + (-imageHeight.value + (backButtonHeight * 2)) * 1.5
    textSize.value = Math.min(24, imageHeight.value - backButtonHeight + 16)
    lineHeight.value = 32
  }
})

onMounted(async () => {
  news.value = await $api.news.getPost(Number(route.params.id))
})
</script>
