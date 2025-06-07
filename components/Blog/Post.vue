<template>
  <div class="flex flex-col gap-2 text-foreground bg-background-100 rounded-lg overflow-hidden show">
    <div class="flex gap-4 items-center m-2">
      <Image
        :src="`https://hapticx.ru/api/media/proxy/file?link=${props.avatar}`"
        :width="40"
        :height="40"
        class="bg-white"
        rounded="full"
      />
      <p v-text="props.author" />
    </div>
    <div class="news-content px-2">
      <template v-for="(node, index) in processedContent" :key="index">
        <template v-if="node.type === 'text'">
          <span v-html="node.content"></span>
        </template>
        <template v-else-if="node.type === 'image'">
          <Image
            :src="`https://hapticx.ru/api/media/proxy/file?link=${node.src}`"
            :height="node.height > 300 ? 300 : node.height"
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
    <div class="w-full text-right -mt-2 px-2 pb-2 text-sm font-medium opacity-50">
      {{ props.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PostList {
  title: string
  avatar: string
  author: string
  date: string
  raw_content: string
  attachments: []
}

const props = defineProps<PostList>()

const processedContent = computed(() => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.raw_content, 'text/html')
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
</script>
