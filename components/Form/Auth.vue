<template>
  <Form
    v-model:is-visible="infoAuthForm"
    formMessage="Введите данные АСУ Проколледж"
  />

  <form class="flex flex-col gap-3" @submit.prevent="auth">
    <h1 class="text-4xl font-light text-center mb-6">Войдите в аккаунт</h1>
    <input
      v-model="authData.login"
      class="bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 text-lg outline-none p-3 rounded-md duration-150"
      placeholder="Логин"
      type="text"
      autocomplete="username"
      required
    />
    <input
      v-model="authData.password"
      class="bg-transparent border-[1px] border-white text-white border-opacity-50 focus:border-opacity-100 focus:invalid:border-red-500 invalid:border-red-800 text-lg outline-none p-3 rounded-md duration-150"
      placeholder="Пароль"
      type="password"
      autocomplete="current-password"
      required
    />

    <Message type="done" text="123" />

    <button
      class="border-[1px] font-semibold text-md border-primary hover:bg-primary hover:text-black rounded-md flex gap-3 justify-center items-center mt-6 duration-150"
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
      class="h-12 border-[1px] font-semibold text-md border-yellow-300 hover:bg-yellow-300 hover:text-black rounded-md flex gap-3 justify-center items-center duration-150"
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
const authData = reactive({
  login: "",
  password: "",
});

async function auth() {
  isLoading.value = true;
  await $fetch(`${API_URL}/user/login`, {
    method: "POST",
    body: authData,
  }).then(() => {
    user.setUserData(res);
    router.push("/profile");
    emit("isClosed");
  }).catch((err) => {
    const res = err.response;
    if (res) {
      console.log(res._data.error)
    }
  });

  isLoading.value = false
}
</script>

<style scoped></style>
