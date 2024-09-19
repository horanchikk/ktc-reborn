<template>
  <Form
    v-model:is-visible="infoAuthForm"
    formMessage="Введите данные АСУ Проколледж"
  />

  <form class="flex flex-col" @submit.prevent="auth">
    <h1 class="text-4xl font-light text-center mb-6">Войдите в аккаунт</h1>
    <input
      v-model="authData.login"
      :class="{
        'opacity-50 cursor-not-allowed': isLoading
      }"
      class="mb-3 bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 text-lg outline-none p-3 rounded-xl duration-150"
      placeholder="Логин"
      type="text"
      autocomplete="username"
      :disabled="isLoading"
      required
    />
    <input
      v-model="authData.password"
      :class="{
        'opacity-50 cursor-not-allowed': isLoading
      }"
      class="mb-3 bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 text-lg outline-none p-3 rounded-xl duration-150"
      placeholder="Пароль"
      type="password"
      autocomplete="current-password"
      :disabled="isLoading"
      required
    />

    <div class="duration-150" :class="errorMsg.show ? 'h-1' : 'h-0'" />
    <div
      :class="errorMsg.show ? 'h-fit' : 'h-0'"
      class="flex items-center duration-150 mb-3"
    >
      <Message
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
    <div class="duration-150" :class="errorMsg.show ? 'h-1' : 'h-0'" />

    <button
      class="border-[1px] mb-3 font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
      :class="isLoading ? 'h-10' : 'h-12'"
      type="submit"
    >
      <Icon name="svg-spinners:ring-resize" v-if="isLoading" class="w-6 h-6" />
      <p
        class="text-lg"
        v-text="isLoading ? 'Авторизация' : 'Войти в аккаунт'"
      />
    </button>
    <button
      @click="infoAuthForm = true"
      class="h-12 border-[1px] font-semibold text-md border-yellow-300 hover:bg-yellow-300 hover:text-black rounded-xl flex gap-3 justify-center items-center duration-150"
      type="button"
    >
      <p class="text-lg">Откуда брать данные?</p>
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
