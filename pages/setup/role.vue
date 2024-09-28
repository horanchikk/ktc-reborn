<template>
  <form
    class="w-full h-full flex flex-col items-center justify-between pt-8 text-white"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-4xl font-bold text-center">Филиал</h1>
      <p class="opacity-50">Где именно вы находитесь?</p>
    </div>
    <div>
      <ClientOnly>
        <lottie-player
          class="w-[200px] h-[200px]"
          autoplay
          loop
          mode="normal"
          src="/lottie/teacher.json"
        />
      </ClientOnly>
    </div>

    <Icon name="svg-spinners:ring-resize" class="show w-20 h-20 text-white" />
    <Select :data="[]" v-model:selected="selectedBranch" />

    <div />

    <div class="w-full">
      <div
        class="w-full flex gap-2 justify-center items-center py-2 opacity-50 hover:opacity-100 duration-150 mb-0.5 cursor-pointer"
      >
        <img
          src="@/assets/icons/alert-circle 1.svg"
          alt="alert circle"
          class="h-7 w-7 text-background-100 rotate-180"
        />
        <p class="font-light text-lg">Откуда брать данные?</p>
      </div>

      <button
        class="w-full py-2 bg-primary flex gap-3 justify-center items-center group disabled:opacity-50 duration-150"
        type="submit"
      >
        <p
          class="text-2xl text-background-100 font-semibold opacity-75 group-hover:opacity-100 duration-150"
          v-text="'Войти в аккаунт'"
        />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "none",
  middleware: ["user-only"],
});

const selectedBranch = ref();
</script>

<style scoped>
@keyframes show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.show {
    animation: show ease-in-out 300ms;
}
</style>
