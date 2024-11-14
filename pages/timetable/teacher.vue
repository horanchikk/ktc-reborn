<template>
  <div
    v-if="!data"
    class="w-full h-full flex items-center justify-center show"
  >
    <ILoader class="w-16 h-16 text-foreground" />
  </div>
  <div
    v-else
    class="flex flex-col gap-2 p-4 show"
  >
    <div
      v-for="teacher in data"
      :key="teacher.id"
      class="bg-primary hover:bg-opacity-80 text-black rounded-md text-xl py-2 font-semibold duration-150 text-center"
      @click="[user.data.teacher_id = teacher.id, router.push('/timetable')]"
      v-text="teacher.title"
    />
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Выберите преподавателя',
  middleware: ['user-only'],
})

const user = useUser()
const api = useApi()
const router = useRouter()
const data = ref(null)

if (!(Object.hasOwn(user.data, 'is_student') && Object.hasOwn(user.data, 'branch_id'))) {
  router.push('/setup/branch')
}
else if (Object.hasOwn(user.data, 'teacher_id')) {
  router.push('/timetable')
}

onMounted(async () => {
  data.value = await api.get(`/teachers/${user.data.branch_id}`)
})
</script>
