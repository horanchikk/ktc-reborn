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
    <div
      v-for="part in data"
      :key="part.title"
      class="flex flex-col gap-2"
    >
      <h1
        class="text-2xl font-semibold"
        v-text="part.title"
      />
      <div class="grid grid-cols-3 grid-rows-auto gap-2">
        <div
          v-for="group in part.groups"
          :key="group.id"
          class="bg-primary hover:bg-opacity-80 text-black rounded-md text-xl py-2 font-semibold duration-150 text-center"
          @click="setGroup(group)"
          v-text="group.title"
        />
      </div>
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
const data = ref(null)

if (!(Object.hasOwn(user.data, 'is_student') && Object.hasOwn(user.data, 'branch_id'))) {
  router.push('/setup/branch')
}
else if (Object.hasOwn(user.data, 'group_id')) {
  router.push('/timetable')
}

function setGroup(group) {
  user.data.group_id = group.id
  router.push('/timetable')
}

onMounted(async () => {
  data.value = await api.get(`/timetable/students/courses/${user.data.branch_id}`)
})
</script>
