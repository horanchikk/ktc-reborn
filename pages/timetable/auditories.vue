<template>
  <div
    v-if="!data"
    class="w-full h-full flex items-center justify-center show"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
  <div
    v-else
    class="flex flex-col p-4 gap-8 show"
  >
    <h1 class="text-2xl font-semibold">
      Сейчас заняты
    </h1>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(auditory, index) in busyAuditories()"
        :key="index"
        class="text-xl font-semibold rounded-md px-2 py-1 bg-primary text-background-100"
      >
        {{ auditory }}
      </span>
    </div>
    <h1 class="text-2xl font-semibold">
      Сейчас свободны
    </h1>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(auditory, index) in busyAuditories()"
        :key="index"
        class="text-xl font-semibold rounded-md px-2 py-1 bg-foreground text-background-100"
      >
        {{ auditory }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Выберите группу',
  middleware: ['user-only'],
})

const user = useUser()
const api = useApi()
const router = useRouter()
const auditories = ref<Array<string> | null>(null)
const auditoriesFree = ref<Array<string> | null>(null)

if (!(Object.hasOwn(user.data, 'is_student') && Object.hasOwn(user.data, 'branch_id'))) {
  router.push('/setup/branch')
}
else if (Object.hasOwn(user.data, 'group_id')) {
  router.push('/timetable')
}

function setAuditory(auditory: string) {
  user.data.auditory = auditory;
  router.push('/timetable')
}

function busyAuditories(): Array<string> {
  const result: Array<string> = [];
  for (let i of auditories.value!!) {
    if (auditoriesFree.value?.indexOf(i) === -1) {
      result.push(i);
    }
  }
  return result;
}

function freeAuditories(): Array<string> {
  const result: Array<string> = [];
  for (let i of auditoriesFree.value!!) {
    result.push(i);
  }
  return result;
}

onMounted(async () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  auditories.value = await api.get(`/timetable/classrooms/`);
  auditoriesFree.value = await api.get(`/timetable/classrooms/free?time=${hours}:${minutes}`);
})
</script>
