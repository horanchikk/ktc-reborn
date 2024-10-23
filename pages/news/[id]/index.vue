<template>
  <div
    ref="page"
    class="flex flex-col gap-2 p-2 overflow-y-auto bg-background-200"
  >
    <div
      ref="header"
      class="right-0 left-0 top-0 fixed"
    >
      <img
        src="http://www.kansk-tc.ru/UserFiles/2024/10/15/2024-10-08_550px..jpeg"
        class="w-full object-cover object-center absolute -z-10"
        :style="`height: ${imageHeight}px`"
      >
      <div
        class="flex w-full flex-col"
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
            @click="$router.back()"
          />
          <span
            class="font-semibold absolute bottom-2.5 truncate w-full pr-4 show"
            :style="`padding-left: ${padLeft}px; font-size: ${textSize}px; line-height: ${lineHeight}px; ${titleStyles};`"
            v-text="news.title"
          />
        </div>
      </div>
    </div>
    <div
      class="flex flex-col min-h-screen h-[2000px] news-content"
      :style="`padding-top: ${headerHeightMax}px`"
      v-html="news.content"
    />
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

definePageMeta({
  layout: 'news',
})

const headerHeightMax = 275
const headerHeightMin = 50
const backButtonHeight = 48
const titleLeftPaddingMin = 10

const route = useRoute()
const api = useApi()
const news = await api.get(`/news/id${route.params.id}?md=false`)

const { y } = useWindowScroll({ behavior: 'smooth' })
const imageHeight = ref(headerHeightMax)
const blur = ref(0)
const padLeft = ref(titleLeftPaddingMin)
const textSize = ref(24)
const lineHeight = ref(32)
const titleStyles = ref('')

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
</script>

<style>
.news-content {
  a {
    @apply underline text-blue-400 hover:text-blue-600 duration-150
  }
}
</style>
