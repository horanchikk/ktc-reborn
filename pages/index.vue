<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ILoader class="w-6 h-6 text-foreground opacity-75 group-hover:opacity-100" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'none',
})

const router = useRouter()

router.push('/auth')
</script>
