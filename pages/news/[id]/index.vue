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
import { useWindowScroll } from '@vueuse/core'

definePageMeta({
  layout: "news",
});

const { y } = useWindowScroll()
watch(y, (val) => console.log(val))
</script>
