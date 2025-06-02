<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="showForm && update"
      class="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-end"
    >
      <div
        ref="target"
        :class="showForm ? 'show-up' : 'show-down'"
        class="w-full bg-background-200 flex flex-col gap-1 rounded-t-xl text-foreground p-5 justify-center items-center"
      >
        <div @click="showForm = false" class="absolute top-3 right-1">
          <IClose
            class="h-[48px] w-[48px] fill-red-400 stroke-red-400"
          />
        </div>
        <h1 class="text-2xl font-semibold">
          Обновление
        </h1>
        <div class="flex text-md opacity-50 gap-2">
          <p>{{ update[2] || 'Текущая версия' }}</p>
          <img :src="`/icons/right-arrow.svg`">
          <p>{{ update[1] || 'Новая версия' }}</p>
        </div>
        <div class="w-full border-b-[1px] border-foreground border-opacity-30 my-1" />
        <div class="w-full max-h-[30vh] overflow-y-scroll transition-all">
          <template v-if="description && description.features && description.features.length > 0">
            <p class="font-bold">
              Нововведения
            </p>
            <ul class="list-disc list-inside text-sm">
              <li
                v-for="(feat, idx) in description.features"
                :key="idx"
              >
                {{ feat }}
              </li>
            </ul>
          </template>
          <template v-if="description && description.bugfixes && description.bugfixes.length > 0">
            <p class="font-bold">
              Исправления
            </p>
            <ul class="list-disc list-inside text-sm">
              <li
                v-for="(fix, idx) in description.bugfixes"
                :key="idx"
              >
                {{ fix }}
              </li>
            </ul>
          </template>
        </div>
        <div class="w-full border-b-[1px] border-foreground border-opacity-30 my-1" />
        <div class="w-full flex justify-center items-center mt-2">
          <NuxtLink v-if="update[3]">
            <button
              class="border-[1px] text-xl px-12 py-1 border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
              @click="installUpdate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              ><g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ><path
                stroke-dasharray="2 4"
                stroke-dashoffset="6"
                d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"
              ><animate
                attributeName="stroke-dashoffset"
                dur="0.6s"
                repeatCount="indefinite"
                values="6;0"
              /></path><path
                stroke-dasharray="32"
                stroke-dashoffset="32"
                d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
              ><animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.1s"
                dur="0.4s"
                values="32;0"
              /></path><path
                stroke-dasharray="10"
                stroke-dashoffset="10"
                d="M12 8v7.5"
              ><animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.5s"
                dur="0.2s"
                values="10;0"
              /></path><path
                stroke-dasharray="6"
                stroke-dashoffset="6"
                d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
              ><animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.7s"
                dur="0.2s"
                values="6;0"
              /></path></g></svg>
              Скачать обновление
            </button>
          </NuxtLink>
          <button
            v-else
            class="border-[1px] text-xl px-12 py-1 border-neutral-600 text-neutral-600 rounded-xl flex gap-3 justify-center items-center duration-150"
          >
            Ссылка временно недоступна
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { Browser } from '@capacitor/browser'

import { useOTA } from '~/composables/useOTA'

type UpdateInfo = [boolean, string, string, string] | undefined;

interface Description {
  features: string[];
  bugfixes: string[];
}

const { needsUpdate, getDescription } = await useOTA()
const log = useLogger('OTAComponent')
const update = ref<UpdateInfo>(needsUpdate() as UpdateInfo)

const description = ref<Description | undefined>()
const target = ref(null)
const showForm = ref(false)

if (update.value) {
  showForm.value = true
  description.value = getDescription() as Description
}

log.log(update.value);

async function installUpdate() {
  if (!update.value?.[3]) {
    log.error('Не удалось получить ссылку на обновление')
    return
  }
  
  try {
    await Browser.open({ url: String(update.value[3]) })
  } catch (error) {
    log.error('Не удалось открыть ссылку на обновление:', error)
  }
}

onClickOutside(target, () => {
  showForm.value = false
})
</script>

<style scoped>
@keyframes showUp {
  0% { transform: translateY(30vh); }
  100% { transform: translateY(0px) }
}

@keyframes showDown {
  0% { transform: translateY(0px); }
  100% { transform: translateY(30vh) }
}

.show-up {
  animation: showUp 300ms ease-in-out;
  animation-fill-mode: forwards;
}

.show-down {
  animation: showDown 300ms ease-in-out;
  animation-fill-mode: forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}

.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
