<template>
  <form
    class="w-full h-full flex flex-col items-center justify-between pt-8 text-foreground animate__animated animate__fadeIn"
    @submit.prevent="nextPage"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-4xl font-bold text-center">
        Филиал
      </h1>
      <p class="opacity-50">
        Где именно вы находитесь?
      </p>
    </div>

    <div>
      <ClientOnly>
        <lottie-player
          class="w-[200px] h-[200px]"
          autoplay
          loop
          mode="normal"
          src="/lottie/student.json"
        />
      </ClientOnly>
    </div>

    <div
      v-if="branches"
      class="mx-10 show"
    >
      <BaseSelect
        id="id"
        v-model:selected="selectedBranch"
        name="title"
        :data="branches"
      />
    </div>
    <ILoader
      v-else
      class="show w-20 h-20 text-foreground"
    />

    <div />

    <button
      class="w-full py-2 bg-primary flex gap-3 justify-center items-center group disabled:opacity-50 duration-150"
      type="submit"
    >
      <svg
        class="w-6 h-6 opacity-75 rotate-180 group-hover:opacity-100"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 24.0002H40"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 12.0002L8.12502 23.8752C8.05598 23.9442 8.05598 24.0562 8.12502 24.1252L20 36.0002"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p
        class="text-2xl text-background-100 font-semibold opacity-75 group-hover:opacity-100 duration-150"
        v-text="'Далее'"
      />
    </button>
  </form>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'

definePageMeta({
  layout: 'none',
  middleware: ['user-only'],
})

const selectedBranch = ref()
const api = useApi()
const router = useRouter()
const user = useUser()
const branches = ref()

function nextPage() {
  if (selectedBranch.value !== null) {
    user.data.branch_id = selectedBranch.value
    router.push('/setup/role')
  }
  else {
    alert('Выберите филиал')
  }
}

onMounted(async () => {
  branches.value = await api.get('/branches', {
    squeeze: true,
  })
})
</script>

<style scoped>
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.show {
  animation: show ease-in-out 300ms;
  animation-fill-mode: forwards;
}
</style>
