<template>
  <div
    class="relative"
    :style="containerStyles"
    :class="roundedClass"
  >
    <NuxtImg
      v-if="cachedSrc"
      :src="cachedSrc"
      :alt="errorMessage"
      class="absolute z-10 top-0 left-0 w-full h-full object-cover object-center"
      :class="[roundedClass, animateClass]"
      :custom="true"
      v-slot="{ src, isLoaded, imgAttrs }"
    >
      <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
    </NuxtImg>
    <div
      class="loading"
      :class="roundedClass"
      :style="containerStyles"
    />
  </div>
</template>

<script setup lang="ts">
interface ImageProps {
  src: string;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  minWidth?: number;
  rounded?: string;
  animate?: boolean;
}

const props = defineProps<ImageProps>();

const errorMessage = 'Возникла проблема с загрузкой фото, попробуйте позже.';

const containerStyles = computed(() => {
  const styles = [];
  
  if (props.height) {
    styles.push(`height: ${props.height}px;`);
  } else if (props.minHeight) {
    styles.push(`min-height: ${props.minHeight}px`);
  }
  
  if (props.maxHeight) {
    styles.push(`max-height: ${props.maxHeight}px`);
  }
  
  if (props.width) {
    styles.push(`width: ${props.width}px;`);
  } else if (props.minWidth) {
    styles.push(`min-width: ${props.minWidth}px`);
  }
  
  return styles;
});

const roundedClass = computed(() => 
  props.rounded ? `rounded-${props.rounded}` : ''
);

const animateClass = computed(() => 
  props.animate ? 'show' : ''
);

const { $getCachedUrl } = useNuxtApp();
const log = useLogger('imageComponent')
const cachedSrc = ref<string | null>(null);

onMounted(async () => {
  try {
    cachedSrc.value = await $getCachedUrl(props.src);
  } catch (error) {
    log.error('Не удалить загрузить картинку: ', error);
  }
});
</script>

<style scoped>
.loading {
  background-color: #f3f4f656;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
