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
        >
          <form
            v-if="formType === 0"
            ref="target"
            :class="isAnimate ? 'animate__fadeInUp' : 'animate__fadeOutDown'"
            class="flex flex-col gap-3 p-5 rounded-md bg-stone-800 text-white animate__animated animate__duration"
            @submit.prevent="[isVisible = false, $emit('isClosed', null)]"
          >
            <p v-text="formMessage" />
            <button type="submit">Ок</button>
          </form>
          <FormAuth :class="isAnimate ? 'animate__fadeInUp' : 'animate__fadeOutDown'" @is-closed="" v-else-if="formType === 1" />
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
  console.log(
    `after ${isVisible.value} | ${isAnimate.value} ${isRendered.value}`
  );
  if (val === true) {
    isAnimate.value = true;
    isRendered.value = true;
  } else {
    isAnimate.value = false;

    setTimeout(() => {
      isRendered.value = false;
    }, 300);
  }
  console.log(
    `then ${isVisible.value} | ${isAnimate.value} ${isRendered.value}`
  );
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
