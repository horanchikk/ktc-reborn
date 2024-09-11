<template>
    <div class="w-full h-full flex justify-center items-center">
        <form @submit.prevent="auth" class="flex flex-col gap-3">
            <h1 class="text-4xl font-light text-center">KTC Auth</h1>
            <input class="bg-transparent border-[1px] border-white text-white text-lg outline-none p-3 rounded-md" placeholder="Логин" type="text" v-model="authData.login">
            <input class="bg-transparent border-[1px] border-white text-white text-lg outline-none p-3 rounded-md" placeholder="Пароль" type="password" v-model="authData.password">
            <button class="border-[1px] font-semibold text-md border-primary rounded-md flex gap-3 justify-center items-center duration-150" :class="isLoading ? 'h-10' : 'h-12'" type="submit">
                <Icon name="svg-spinners:ring-resize" v-if="isLoading" class="w-6 h-6" />
                <p class="text-lg">{{ isLoading ? 'Авторизация' : 'Войти в аккаунт' }}</p>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { $fetch } from 'ofetch'
import { useUser } from '~/store/useUser';

definePageMeta({
    layout: 'none'
})

const { public: {API_URL} } = useRuntimeConfig()
const user = useUser()
const isLoading = ref(false)
const router = useRouter()

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