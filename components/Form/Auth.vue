<template>
  <Form v-model:is-visible="infoAuthForm" formMessage="Введите данные АСУ Проколледж" />

  <form class="flex flex-col items-center pt-8" @submit.prevent="auth">
    <h1 class="text-4xl font-bold text-center mb-8">Войдите в аккаунт</h1>
    <div class="w-full flex flex-col items-center px-12">
      <input v-model="authData.login" :class="{
        'opacity-50 cursor-not-allowed': isLoading
      }"
        class="w-full text-2xl font-light mb-3 bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 outline-none px-6 py-3 rounded-lg duration-150"
        placeholder="Логин" type="text" autocomplete="username" :disabled="isLoading" required />
      <input v-model="authData.password" :class="{
        'opacity-50 cursor-not-allowed': isLoading
      }"
        class="w-full text-2xl font-light mb-3 bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 outline-none px-6 py-3 rounded-lg duration-150"
        placeholder="Пароль" type="password" autocomplete="current-password" :disabled="isLoading" required />

      <div class="duration-150" :class="errorMsg.show ? 'h-1' : 'h-0'" />
      <div :class="errorMsg.show ? 'h-fit' : 'h-0'" class="flex items-center duration-150 mb-3">
        <Message class="w-full" :class="errorMsg.show
            ? 'opacity-100 h-fit duration-100'
            : 'opacity-0 h-0 duration-100'
          " type="danger" :text="errorMsg.msg" />
      </div>
      <div class="duration-150" :class="errorMsg.show ? 'h-1' : 'h-0'" />

    </div>

    <div @click="infoAuthForm = true" class="w-full flex gap-2 justify-center items-center py-2 opacity-50 hover:opacity-100 duration-150 mb-0.5">
      <img src="@/assets/icons/alert-circle 1.svg" alt="alert circle" class="h-7 w-7 text-background-100 rotate-180" />
      <p class="font-light text-lg">Откуда брать данные?</p>
    </div>

    <button
      class="w-full bg-primary rounded-b-[32px] flex gap-3 justify-center items-center group disabled:opacity-50 duration-150"
      :disabled="isLoading" type="submit">
      <Icon name="svg-spinners:ring-resize" v-if="isLoading"
        class="w-6 h-6 text-background-100 opacity-75 group-hover:opacity-100" />
      <img v-else src="@/assets/icons/login 1.svg" alt="logout" class="w-6 h-6 opacity-75 group-hover:opacity-100" />

      <p class="text-2xl text-background-100 font-semibold py-3 opacity-75 group-hover:opacity-100 duration-150"
        v-text="isLoading ? 'Загрузка...' : 'Войти в аккаунт'" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { $fetch } from "ofetch";
import { useUser } from "~/store/useUser";

const emit = defineEmits(["isClosed"]);

const {
  public: { API_URL },
} = useRuntimeConfig();
const router = useRouter();
const user = useUser();

const infoAuthForm = ref(false);
const isLoading = ref(false);
const errorMsg = reactive({
  show: false,
  msg: "",
});
const authData = reactive({
  login: "",
  password: "",
});

async function auth() {
  isLoading.value = true;
  errorMsg.show = false;
  await $fetch(`${API_URL}/user/login`, {
    method: "POST",
    body: authData,
  })
    .then((res) => {
      user.setUserData(res);
      router.push("/profile");
      emit("isClosed");
    })
    .catch((err) => {
      const res = err.response;
      errorMsg.show = true;

      if (res)
        errorMsg.msg = res._data.error;
      else
        errorMsg.msg = "Проблемы с подключением к серверу. Попробуйте позже"

    });

  isLoading.value = false;
}
</script>

<style scoped></style>
