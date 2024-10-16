<template>
  <div
    class="flex flex-col gap-2 p-2 overflow-y-auto bg-background-200"
    ref="page"
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
          :class="`w-full h-full transition-all`"
          :style="`backdrop-filter: blur(${blur}px); background-color: rgba(33,33,33,0);`"
          ref="blurry"
        >
          <img
            src="@/assets/icons/arrow-left-alt 1.svg"
            class="w-12 h-12 ml-2"
            @click="onBack"
          >
          <span
            class="font-semibold absolute bottom-2 truncate w-full pr-4"
            :style="`padding-left: ${padLeft}px; font-size: ${textSize}px; line-height: ${lineHeight}px; ${titleStyles}`"
          >
            {{ title }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col min-h-screen h-[2000px]"
      :style="`padding-top: ${headerHeightMax}px`"
    >
      <span v-for="(i, x) in [1,2,3,4,5,6,67,8,9,10,11,12,13,14,15,16]">
        CONTENT SVO
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

definePageMeta({
  layout: "news",
});


const headerHeightMax = 275;
const headerHeightMin = 50;
const backButtonHeight = 48;
const titleLeftPaddingMin = 4;


const title = ref("Визит Китайской делегации в наш колледж");


const { y } = useWindowScroll({behavior: 'smooth'});
const imageHeight = ref(headerHeightMax);
const blur = ref(0);
const padLeft = ref(titleLeftPaddingMin);
const textSize = ref(24);
const lineHeight = ref(32);
const titleStyles = ref('');


watch(y, (val) => {
  imageHeight.value = Math.max(headerHeightMin, headerHeightMax - val);
  blur.value = Math.ceil((headerHeightMax - imageHeight.value) / 25);
  if (imageHeight.value > backButtonHeight*2) {
    padLeft.value = titleLeftPaddingMin;
    textSize.value = 24;
    lineHeight.value = 32;
  } else {
    padLeft.value = titleLeftPaddingMin + (-imageHeight.value + (backButtonHeight*2)) * 1.5;
    textSize.value = Math.min(24, imageHeight.value - backButtonHeight + 16);
    lineHeight.value = 32;
  }
});


function onBack() {
  console.log("back pressed")
}

</script>
