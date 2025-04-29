<template>
  <div class="flex flex-col w-screen h-screen bg-background-100 text-foreground">
    <main class="flex-auto show flex justify-center items-center">
      <div class="w-[413px] h-full flex flex-col gap-3 items-center justify-center">
        <p class="font-bold text-4xl">
          Возникла ошибка
        </p>
        <p class="text-xl text-center">
          Не переживайте, мы уже знаем<br>о проблеме и решаем её 😊
        </p>
        <button
          class="mt-3 border-[1px] text-md px-10 border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
          @click="router.push('/')"
        >
          Вернуться на главную
        </button>
        <p
          class="text-sm opacity-30"
          v-text="error"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const error = useError()

definePageMeta({
  layout: 'none',
})
</script>
