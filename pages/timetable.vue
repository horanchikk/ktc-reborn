<template>
  <p>here is timetable</p>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'

definePageMeta({
  name: 'Расписание',
  middleware: ['user-only', 'setupped-only'],
})

const user = useUser()
const router = useRouter()

if (!(Object.hasOwn(user.data, 'isStudent') && Object.hasOwn(user.data, 'branch'))) {
  router.push('/setup/branch')
}
</script>
