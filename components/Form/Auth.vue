<template>
  <form
    class="flex flex-col gap-3"
    @submit.prevent="[$emit('isClosed')]"
  >
    <h1 class="text-4xl font-light text-center mb-6">Войдите в аккаунт</h1>
    <input
      class="bg-transparent border-[1px] border-white text-white text-lg outline-none p-3 rounded-md"
      placeholder="Логин"
      type="text"
      v-model="authData.login"
    />
    <input
      class="bg-transparent border-[1px] border-white text-white text-lg outline-none p-3 rounded-md"
      placeholder="Пароль"
      type="password"
      v-model="authData.password"
    />
    <button
      class="border-[1px] font-semibold text-md border-primary rounded-md flex gap-3 justify-center items-center mt-6 duration-150"
      :class="isLoading ? 'h-10' : 'h-12'"
      type="submit"
    >
      <Icon name="svg-spinners:ring-resize" v-if="isLoading" class="w-6 h-6" />
      <p class="text-lg">
        {{ isLoading ? "Авторизация" : "Войти в аккаунт" }}
      </p>
    </button>
    <button
      @click="form.show('Необходимо ввести данные АСУ Проколледж')"
      class="h-12 border-[1px] font-semibold text-md border-yellow-300 rounded-md flex gap-3 justify-center items-center duration-150"
      type="button"
    >
      <p class="text-lg">Откуда брать данные?</p>
    </button>
  </form>
</template>

<script setup lang="ts">
import { $fetch } from 'ofetch'
import { useUser } from '~/store/useUser';

defineEmits(['isClosed'])

const { public: {API_URL} } = useRuntimeConfig()
const router = useRouter()
const user = useUser()

const isLoading = ref(false)
const authData = reactive({
    login: "rp-09-21-1-morozovvv",
    password: "whwye323"
})

async function auth() {
    isLoading.value = true
    const res = await $fetch(`${API_URL}/user/login`, {
        method: "POST",
        body: authData
    })
    user.setUserData(res)
    router.push('/profile')
}
</script>

<style scoped></style>
