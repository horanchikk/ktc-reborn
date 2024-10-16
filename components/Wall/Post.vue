<template>
  <div class="flex flex-col gap-2 text-foreground bg-background-100 rounded-lg overflow-hidden">
    <img :src="image" :alt="title" class="h-[170px] object-cover object-center" >
    <span class="px-2 leading-none text-xl font-semibold">
      {{ title }}
    </span>
    <span class="px-2 font-medium">
      {{ description }}
    </span>
    <span class="w-full text-right -mt-2 px-2 pb-2 text-sm font-medium opacity-50">
      {{ date }}
    </span>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    image?: string,
    title?: string,
    description?: string
    date?: string
  }>(), {
  }
);

</script>
