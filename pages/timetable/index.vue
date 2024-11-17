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
      v-for="(day, dayIdx) in data.days"
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
        class="w-full px-5 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
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
        <div class="text-sm text-center font-semibold w-52 sm:w-full">
          <p v-text="fixLessonTitle(lesson.title)" />
          <p
            v-if="lesson.teacher"
            class="opacity-50"
            v-text="lesson.teacher"
          />
          <p
            v-if="lesson.group"
            class="opacity-50"
            v-text="lesson.group"
          />
        </div>
        <div
          class="flex flex-col text-sm w-20 text-right"
          v-text="lesson.classroom"
        />
      </div>
      <div
        v-if="dayIdx !== data.days.length - 1"
        class="h-[1px] bg-foreground w-11/12 opacity-30"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Расписание',
  middleware: ['user-only'],
})

const user = useUser()
const api = useApi()
const router = useRouter()
const data = ref(null)

if (!(Object.hasOwn(user.data, 'is_student') || Object.hasOwn(user.data, 'branch_id'))) {
  router.push('/setup/branch')
}

function fixLessonTitle(title: string) {
  return title[title.length - 1] === ',' ? title.split('').slice(0, title.length - 1).join('') : title
}

onMounted(async () => {
  if (user.data.is_student) {
    if (!Object.hasOwn(user.data, 'group_id')) {
      router.push('/timetable/group')
    }
    else {
      data.value = await api.get(`/timetable/students/courses/${user.data.branch_id}/group/${user.data.group_id}`)
    }
  }
  else {
    if (!Object.hasOwn(user.data, 'teacher_id')) {
      router.push('/timetable/teacher')
    }
    else {
      data.value = await api.get(`/teachers/${user.data.branch_id}/id${user.data.teacher_id}`)
    }
  }
})
</script>
