<template>
  <div class="flex flex-col gap-4 min-h-screen p-2">
    <EditorWysiWyg />
    <div class="w-48 h-8 loading" />
    <button
      class="mt-3 w-full border-[1px] font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
      @click="testSnackBar"
    >
      Тест snackbar
    </button>
    <button
      class="mt-3 w-full border-[1px] font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
      @click="throwNewError"
    >
      Вызвать ошибку
    </button>
  </div>
</template>

<script setup lang="ts">
const { $snackbar } = useNuxtApp()

definePageMeta({
  layout: 'none'
})

function testSnackBar() {
  $snackbar.add({
    type: 'success',
    text: 'This is a snackbar message'
  })
}

const throwNewError = () => {throw new Error('test')}
</script>
