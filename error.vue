<template>
  <div class="flex flex-col w-screen h-screen bg-background-100 text-foreground">
    <main class="flex-auto text-8xl font-bold flex flex-col items-center justify-center">
      <p>404</p>
      <button
        class="mt-3 border-[1px] font-semibold text-xl px-10 border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
        @click="router.back()"
      >
        Вернуться обратно
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

definePageMeta({
  layout: 'none',
})
</script>
