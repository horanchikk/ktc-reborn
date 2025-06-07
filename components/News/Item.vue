<template>
  <div class="bg-background-100 rounded-md mx-2">
    <NuxtLink :to="`/gallery/${$props.item.id}`">
      <Image :height="300" :src="props.item.preview" />
      <p
        class="text-center text-sm font-semibold my-3 px-3"
        v-text="$props.item.title"
      />
      <p class="text-xs text-right mb-2 pr-2 pb-1" v-text="$props.item.date" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: object;
}>();
</script>

<style scoped></style>
