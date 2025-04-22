<template>
  <div
    v-if="!(auditories && auditoriesFree)"
    class="w-full h-full flex items-center justify-center show"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
  <div
    v-else
    class="flex flex-col p-4 gap-2 show"
  >
    <template v-if="busyAuditories.length > 0">
      <h1 class="text-2xl font-semibold">
        Сейчас заняты
      </h1>
      <div class="flex flex-wrap gap-2 mb-8">
        <span
          v-for="(auditory, index) in busyAuditories"
          :key="index"
          class="text-xl font-semibold rounded-md px-2 py-1 bg-primary text-background-100"
          @click="$router.push(`/timetable/auditory/${auditory}`)"
        >
          {{ auditory }}
        </span>
        <p>Кабинеты отстутствуют</p>
      </div>
    </template>
    <template v-if="auditoriesFree.length > 0">
      <h1 class="text-2xl font-semibold">
        Сейчас свободны
      </h1>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(auditory, index) in auditoriesFree"
          :key="index"
          class="text-xl font-semibold rounded-md px-2 py-1 bg-foreground text-background-100"
          @click="$router.push(`/timetable/auditory/${auditory}`)"
        >
          {{ auditory }}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'Выберите аудиторию',
  middleware: ['user-only'],
})

const api = useApi()
const auditories = ref<Array<string> | null>(null)
const auditoriesFree = ref<Array<string> | null>(null)

const busyAuditories = computed(() => {
  const result: Array<string> = []

  // TODO: write types
  for (const i of auditories.value!) {
    if (auditoriesFree.value?.indexOf(i) === -1) {
      result.push(i)
    }
  }
  return result
})

onMounted(async () => {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  auditories.value = await api.get(`/timetable/classrooms/`)
  auditoriesFree.value = await api.get(`/timetable/classrooms/free?time=${hours}:${minutes}`)
})
</script>
