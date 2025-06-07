<template>
  <div class="flex flex-col gap-2 text-foreground bg-background-100 rounded-lg overflow-hidden">
    <NuxtImg
      v-if="cachedSrc"
      :src="cachedSrc"
      :alt="'Возникла проблема с загрузкой фото, попробуйте позже.'"
      class="h-[200px] object-cover object-center"
      :height="200"
      :custom="true"
      v-slot="{ src, isLoaded, imgAttrs }"
    > 
      <img
        v-if="isLoaded"
        v-bind="imgAttrs"
        :src="src"
      >
      <div v-else class="w-full h-[200px] loading" />
    </NuxtImg>
    <div v-else class="w-full h-[200px] loading" />

    <div class="px-2 leading-none text-xl font-semibold">
      {{ $props.title }}
    </div>
    <div class="px-2 font-medium">
      {{ $props.description }}
    </div>
    <div class="w-full text-right -mt-2 px-2 pb-2 text-sm font-medium opacity-50">
      {{ $props.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { $getCachedUrl } = useNuxtApp()

const props = defineProps<{
  image?: string
  title?: string
  description?: string
  date?: string
}>()

const cachedSrc = ref()
onMounted(async () => cachedSrc.value = await $getCachedUrl(props.image))
</script>
