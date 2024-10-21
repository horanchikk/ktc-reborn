<template>
  <Form
    v-model:is-visible="infoAuthForm"
    form-message="Введите данные АСУ Проколледж"
  />

  <form
    class="w-full h-full flex flex-col items-center justify-between pt-8 text-white"
    @submit.prevent="auth"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-4xl font-bold text-center">
        Войдите в аккаунт
      </h1>
      <p class="opacity-50">
        представьтесь пожалуйста
      </p>
    </div>
    <div>
      <ClientOnly>
        <lottie-player
          class="w-[200px] h-[200px]"
          autoplay
          loop
          mode="normal"
          src="/lottie/eyes.json"
        />
      </ClientOnly>
    </div>
    <div class="w-full flex flex-col items-center px-12">
      <input
        v-model="authData.login"
        :class="{
          'opacity-50 cursor-not-allowed': isLoading,
        }"
        class="w-full text-xl font-light mb-3 bg-transparent border-2 border-foreground text-foreground border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 outline-none px-6 py-2 rounded-lg duration-150"
        placeholder="Логин"
        type="text"
        autocomplete="username"
        :disabled="isLoading"
        required
      >
      <input
        v-model="authData.password"
        :class="{
          'opacity-50 cursor-not-allowed': isLoading,
        }"
        class="w-full text-xl font-light mb-3 bg-transparent border-2 border-foreground text-foreground border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 outline-none px-6 py-2 rounded-lg duration-150"
        placeholder="Пароль"
        type="password"
        autocomplete="current-password"
        :disabled="isLoading"
        required
      >

      <div
        class="duration-150"
        :class="errorMsg.show ? 'h-1' : 'h-0'"
      />
      <div
        :class="errorMsg.show ? 'h-fit' : 'h-0'"
        class="flex items-center duration-150 mb-3"
      >
        <BaseMessage
          class="w-full"
          :class="
            errorMsg.show
              ? 'opacity-100 h-fit duration-100'
              : 'opacity-0 h-0 duration-100'
          "
          type="danger"
          :text="errorMsg.msg"
        />
      </div>
      <div
        class="duration-150"
        :class="errorMsg.show ? 'h-1' : 'h-0'"
      />
    </div>
    <div>
      <DevOnly>
        <button
          type="button"
          class="relative"
          @click="useDebug().show"
        >
          <Icon
            name="material-symbols:bug-report-outline-rounded"
            class="absolute -top-2 -left-3 h-8 w-8 opacity-40 hover:opacity-100"
          />
        </button>
      </DevOnly>
    </div>

    <div class="w-full">
      <div
        class="w-full flex gap-2 justify-center items-center py-2 opacity-50 hover:opacity-100 duration-150 mb-0.5 cursor-pointer"
        @click="infoAuthForm = true"
      >
        <IAlertCircle class="h-7 w-7 text-background-100 rotate-180" />
        <p class="font-light text-lg">
          Откуда брать данные?
        </p>
      </div>

      <button
        class="w-full py-2 bg-primary flex gap-3 justify-center items-center group disabled:opacity-50 duration-150"
        :disabled="isLoading"
        type="submit"
      >
        <ILoader
          v-if="isLoading"
          class="w-6 h-6 text-background-100 opacity-75 group-hover:opacity-100"
        />
        <ILogin
          v-else
          class="w-6 h-6 opacity-75 group-hover:opacity-100"
        />

        <p
          class="text-2xl text-background-100 font-semibold opacity-75 group-hover:opacity-100 duration-150"
          v-text="isLoading ? 'Загрузка...' : 'Войти в аккаунт'"
        />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUser } from '~/store/useUser'
import { useDebug } from '~/store/useDebug'

definePageMeta({
  layout: 'none',
  middleware: 'guest-only',
})

const emit = defineEmits(['isClosed'])

const { $config: { public: { ACCOUNT_LOGIN, ACCOUNT_PASSWD } } } = useNuxtApp()
const router = useRouter()
const user = useUser()
const api = useApi()

const infoAuthForm = ref(false)
const isLoading = ref(false)
const errorMsg = reactive({
  show: false,
  msg: '',
})
const authData = reactive({
  login: ACCOUNT_LOGIN || '',
  password: ACCOUNT_PASSWD || '',
})

async function auth() {
  isLoading.value = true
  errorMsg.show = false

  await api
    .post('/user/login', authData)
    .then((res) => {
      user.setUserData(res)
      router.push('/profile')
      emit('isClosed')
    })
    .catch((err) => {
      const res = err.response
      errorMsg.show = true

      if (res) errorMsg.msg = res._data.error
      else errorMsg.msg = 'Проблемы с подключением к серверу. Попробуйте позже'
    })

  isLoading.value = false
}
</script>
