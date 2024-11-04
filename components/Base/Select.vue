<template>
  <div class="flex flex-col gap-4">
    <template v-if="id && name">
      <div
        v-for="part in data"
        :key="part[id]"
        class="flex gap-2 cursor-pointer select-none"
        @click="selected = part[id]"
      >
        <svg
          class="min-w-[32px] min-h-[32px]"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="duration-200"
            :stroke="selected === part[id] ? '#FF4646' : '#ffffff'"
            d="M27.9999 16C27.9999 22.6275 22.6273 28 15.9999 28C9.37246 28 3.99988 22.6275 3.99988 16C3.99988 9.37259 9.37246 4 15.9999 4C22.6273 4 27.9999 9.37259 27.9999 16Z"
            stroke-width="2.66667"
          />
          <path
            v-if="selected === part[id]"
            :stroke="selected === part[id] ? '#FF4646' : '#ffffff'"
            class="zoom-show duration-200"
            d="M11.9999 15.9999L14.2436 18.2437C14.4772 18.4773 14.8559 18.4773 15.0895 18.2437L19.9999 13.3333"
            stroke-width="2.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p
          class="text-[20px] duration-150"
          :class="{
            'text-primary': selected === part[id],
          }"
        >
          {{ part[name] }}
        </p>
      </div>
    </template>
    <template v-else>
      <div
        v-for="(text, idx) in data"
        :key="idx"
        class="flex gap-2"
        @click="selected = text"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="duration-200"
            d="M27.9999 16C27.9999 22.6275 22.6273 28 15.9999 28C9.37246 28 3.99988 22.6275 3.99988 16C3.99988 9.37259 9.37246 4 15.9999 4C22.6273 4 27.9999 9.37259 27.9999 16Z"
            :stroke="selected === text ? '#FF4646' : '#ffffff'"
            stroke-width="2.66667"
          />
          <path
            v-if="selected === text"
            class="zoom-show duration-200"
            d="M11.9999 15.9999L14.2436 18.2437C14.4772 18.4773 14.8559 18.4773 15.0895 18.2437L19.9999 13.3333"
            :stroke="selected === text ? '#FF4646' : '#ffffff'"
            stroke-width="2.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p
          class="text-xl duration-150"
          :class="{
            'text-primary': selected === text,
          }"
        >
          {{ text }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  name?: string
  data: object[] | string[]
}>()

const selected = defineModel<string | object>('selected', { default: undefined })
</script>

<style scoped>
@keyframes zoomShow {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.zoom-show {
  animation: zoomShow ease-in-out 200ms;
}
</style>
