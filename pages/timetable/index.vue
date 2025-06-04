<template>
  <div
    v-show="!timetable"
    class="w-full h-full flex items-center justify-center show"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
  <div
    v-if="timetable"
    class="flex flex-col gap-2 show py-4 h-full"
  >
    <div
      v-show="week"
      class="grid grid-cols-3 place-items-center mb-5"
    >
      <img
        v-if="week.current_week !== week.previous_week && week.previous_week !== 0"
        :src="`/icons/chevron-left-alt.svg`"
        class="w-8 h-8 hover:opacity-100 duration-150 cursor-pointer"
        :alt="'chevron-left-alt'"
        @click="previousWeek"
      >
      <div v-else />
      <p class="text-2xl font-semibold text-center">
        Неделя {{ week.current_week }}
      </p>
      <img
        :src="`/icons/chevron-left-alt.svg`"
        class="w-8 h-8 rotate-180 hover:opacity-100 duration-150 cursor-pointer"
        :alt="'chevron-left-alt'"
        @click="nextWeek"
      >
    </div>
    <template v-show="hasLessons">
      <div
        v-for="(day, dayIdx) in timetable.days"
        :key="day.title"
        class="flex flex-col items-center"
      >
        <h1
          class="text-2xl font-semibold"
          v-text="getDayOfWeek(day.title)"
        />
        <p
          v-if="day.start"
          class="mt-0.5 text-sm opacity-50"
          v-text="`${day.start} - ${day.end} (~ ${day.hours} ${getHourWord(day.hours)})`"
        />
        <div
          v-else
          class="mt-2"
        />
        <section
          v-for="(lesson, lessonIdx) in day.lessons"
          :key="lessonIdx"
          class="w-full my-2 px-5 flex items-center justify-between"
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
        </section>
        <div
          v-if="dayIdx !== timetable.days.length - 1"
          class="h-[1px] bg-foreground w-11/12 opacity-30"
        />
      </div>
    </template>
    <div
      v-show="!hasLessons"
      class="w-full h-full flex items-center justify-center"
    >
      <p class="text-2xl font-semibold text-center">
        Пары отсутствуют 🥳
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHeader } from '~/store/useHeader'
import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Расписание',
  middleware: ['user-only'],
})

const { $api } = useNuxtApp()
const user = useUser()
const router = useRouter()
const header = useHeader()
const log = useLogger('timetable')

const timetable = ref(null)
const week = ref(null)

async function nextWeek() {
  await updateTimetable(week.value.next_week)
}
async function previousWeek() {
  await updateTimetable(week.value.previous_week)
}

const hasLessons = computed(() => timetable.value.days.length > 0)

watch(week, (val) => {
  log.info(val)
})

if (
  !(
    Object.hasOwn(user.data, 'is_student')
    || Object.hasOwn(user.data, 'branch_id')
  )
) {
  router.push('/setup/branch')
}

function fixLessonTitle(title: string) {
  return title[title.length - 1] === ','
    ? title
        .split('')
        .slice(0, title.length - 1)
        .join('')
    : title
}

function getHourWord(n: number): string {
  const absN = Math.abs(n)
  const mod10 = absN % 10
  const mod100 = absN % 100

  if (mod10 === 1 && mod100 !== 11) {
    return 'час'
  }
  else if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return 'часа'
  }
  else {
    return 'часов'
  }
}

async function updateTimetable(numberOfWeek?: number) {
  timetable.value = null

  timetable.value = await $api.timetable.getTimetable(
    user.data.branch_id,
    user.data.group_id,
    numberOfWeek,
  )

  week.value = {
    next_week: timetable.value.next_week,
    previous_week: timetable.value.previous_week,
    current_week: timetable.value.current_week,
  }
}

function getDayOfWeek(name: string) {
  switch (name) {
    case 'ПН':
      return 'Понедельник'
    case 'ВТ':
      return 'Вторник'
    case 'СР':
      return 'Среда'
    case 'ЧТ':
      return 'Четверг'
    case 'ПТ':
      return 'Пятница'
    case 'СБ':
      return 'Суббота'
    case 'ВС':
      return 'Воскресенье'

    default:
      return name
  }
}

onMounted(async () => {
  if (user.data.is_student) {
    if (!Object.hasOwn(user.data, 'group_id')) {
      router.push('/timetable/group')
    }
    else {
      await updateTimetable()
    }
  }
  else {
    if (!Object.hasOwn(user.data, 'teacher_id')) {
      router.push('/timetable/teacher')
    }
    else {
      timetable.value = await $api.timetable.getTeacherTimetable(user.data.branch_id, user.data.teacher_id)
    }
  }
})

header.setAdditionalMenu(
  user.data.is_student
    ? [
        {
          name: 'Выбрать группу',
          icon: 'pencil',
          action: () => router.push('/timetable/group'),
        },
        {
          name: 'Занятость кабинетов',
          icon: 'calendar',
          action: () => router.push('/timetable/auditories'),
        },
      ]
    : [
        {
          name: 'Выбрать преподавателя',
          icon: 'pencil',
          action: () => router.push('/timetable/teacher'),
        },
        {
          name: 'Занятость кабинетов',
          icon: 'calendar',
          action: () => router.push('/timetable/auditories'),
        },
      ],
)
</script>
