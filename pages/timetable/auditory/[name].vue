<template>
  <div
    v-if="!data"
    class="w-full h-full flex items-center justify-center show"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
  <div
    v-else
    class="flex flex-col gap-2 show py-4"
  >
    <div
      v-for="(day, dayIdx) in data"
      :key="day.title"
      class="flex flex-col gap-4 items-center"
    >
      <h1
        class="text-2xl font-semibold"
        v-text="day.title"
      />
      <div
        v-for="(lesson, lessonIdx) in day.lessons"
        :key="lessonIdx"
        class="w-full px-5 py-1 flex items-center justify-between"
        :class="{
          'bg-white bg-opacity-10': lesson.available,
        }"
      >
        <div class="flex items-center gap-3 w-[90px]">
          <p
            class="text-3xl font-semibold opacity-60"
            v-text="lesson.number"
          />
          <div class="flex flex-col text-sm text-center">
            <div v-text="lesson.start" />
            <div class="w-full h-[1px] bg-foreground" />
            <div v-text="lesson.end" />
          </div>
        </div>
        <div class="text-sm text-center font-semibold w-full sm:w-full">
          <p v-text="lesson.title ?? 'Свободно'" />
          <p
            v-if="lesson.teacher"
            class="opacity-50"
            v-text="lesson.teacher"
          />
        </div>
      </div>
      <div
        v-if="dayIdx !== data.length - 1"
        class="h-[1px] bg-foreground w-11/12 opacity-30"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TDays } from '~/types/timetable'

definePageMeta({
  name: 'Расписание аудитории',
  middleware: ['user-only'],
})

const { $api } = useNuxtApp()
const { params: { name } } = useRoute()

const data = ref<TDays>()

onMounted(async () => {
  data.value = await $api.timetable.getClassroom(name.toString())
})
</script>
