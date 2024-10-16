<template>
  <div
    class="flex flex-col gap-2 p-2 overflow-y-auto bg-background-200"
    ref="page"
    v-scroll="onScroll"
  >
    <div
      ref="header"
      class="right-0 left-0 top-0 fixed"
    >
      <img
        src="@/assets/icons/arrow-left-alt 1.svg"
        class="w-12 h-12 ml-2"
      >
      <span class="">

      </span>
    </div>
    <div class="flex flex-col min-h-screen">

    </div>
    <div class="flex flex-col min-h-screen">

    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseScrollReturn } from '@vueuse/core';

import { vScroll } from '@vueuse/components';


definePageMeta({
  layout: "news",
});

const header = ref<HTMLElement | null>(null);
const page = ref<HTMLElement | null>(null);


function onScroll(state: UseScrollReturn) {
  console.log(state) // {x, y, isScrolling, arrivedState, directions}
}


</script>
