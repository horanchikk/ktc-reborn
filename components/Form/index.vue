<template>
  <Teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen" v-if="isRendered">
      <div class="relative w-full h-full">
        <div
          :class="isAnimate ? 'animate__fadeIn' : 'animate__fadeOut'"
          class="w-full h-full backdrop-blur-md animate__animated animate__duration"
        />
        <div
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          :class="isAnimate ? 'fadeInUp' : 'fadeOutDown'"
        >
          <div
            :class="{
              'p-5': formType !== 1,
            }"
            class="w-[440px] flex flex-col gap-3 rounded-[32px] bg-background-100 text-white shadow-xl"
          >
            <div class="w-full h-full" v-if="formType === -1">
              <slot />

              <button
                class="mt-3 w-full border-[1px] font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
                @click="isVisible = false"
              >
                Ок
              </button>
            </div>
            <form
              v-else-if="formType === 0"
              ref="target"
              @submit.prevent="[(isVisible = false), $emit('isClosed', null)]"
              class="flex flex-col gap-5 justify-center items-center"
            >
              <p v-text="formMessage" />
              <button
                class="w-full border-[1px] font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
                type="submit"
              >
                Ок
              </button>
            </form>
            <FormAuth
              @is-closed="isVisible = false"
              v-else-if="formType === 1"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const target = ref(null);
const isAnimate = ref(false);
const isVisible = defineModel("isVisible");
const isRendered = ref(isAnimate.value);

const props = withDefaults(
  defineProps<{
    closable?: boolean;
    formMessage?: string;
    formType?: number;
  }>(),
  {
    closable: true,
    formType: 0,
  }
);
defineEmits(["isClosed"]);

watch(isVisible, (val) => {
  if (val === true) {
    isAnimate.value = true;
    isRendered.value = true;
  } else {
    isAnimate.value = false;

    setTimeout(() => {
      isRendered.value = false;
    }, 300);
  }
});

// watcher fix
if (isVisible.value === true) {
  isAnimate.value = true;
  isRendered.value = true;
}

onClickOutside(target, () => {
  if (props.closable) isVisible.value = false;
});
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: scale(110%);
  }
  100% {
    opacity: 1;
    transform: scale(100%);
  }
}

.fadeInUp {
  animation: fadeInUp 200ms ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes fadeOutDown {
  0% {
    opacity: 1;
    transform: scale(100%);
  }
  100% {
    opacity: 0;
    transform: scale(110%);
  }
}

.fadeOutDown {
  animation: fadeOutDown 200ms ease-in-out;
  animation-fill-mode: forwards;
}
</style>
