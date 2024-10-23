<template>
  <div
    v-if="store.isRendered"
    ref="sideBarEl"
    class="w-screen h-screen fixed top-0 left-0 z-10"
  >
    <div
      :class="store.isVisible ? 'bg-opacity-70' : 'bg-opacity-0'"
      class="w-full h-full bg-black animate__animated animate__faster animate__fadeIn duration-500"
      @click="store.hide"
    />
    <div
      :class="
        store.isVisible
          ? 'animate__animated animate__faster animate__slideInLeft'
          : 'animate__animated animate__faster animate__slideOutLeft'
      "
      class="absolute top-0 min-w-[330px] h-full bg-background-100 p-4"
      :style="`left: -${translateTo}px`"
    >
      <div
        class="w-full h-full flex flex-col gap-[10px] show transition-all"
        :class="store.isVisible ? 'opacity-100' : 'opacity-0'"
      >
        <div class="flex items-center gap-4 mb-4">
          <img
            v-if="info"
            :src="info.user_info.image"
            class="w-[72px] h-[72px] rounded-full show"
          >
          <div
            v-else
            class="w-[72px] h-[72px] rounded-full loading"
          />
          <div class="w-fit flex flex-col text-foreground">
            <h1
              v-if="info"
              class="text-2xl show"
              v-text="info.user_info.name"
            />
            <div
              v-else
              class="w-48 h-8 rounded-md loading"
            />
            <div class="flex justify-between opacity-60">
              <template v-if="info">
                <h3
                  class="show"
                  v-text="info.main_info.Группа"
                />
                <h3
                  class="show"
                  v-text="info.courses[0].title"
                />
              </template>
              <template v-else>
                <div
                  class="h-6 w-16 mt-2 rounded-md loading"
                />
                <div
                  class="h-6 w-16 mt-2 rounded-md loading"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="w-full bg-foreground opacity-25 h-[1px]" />
        <div class="flex flex-col divide-y-[1px] divide-background-200">
          <NuxtLink
            v-for="(link, idx) in links"
            :key="idx"
            :to="link.route"
            @click="store.isVisible = false"
          >
            <BaseSideBarElement
              :type="link.icon"
              :text="link.name"
              :color="useRouter().currentRoute.value.path === link.route ? '#FF4646' : '#EDE8D8'"
            />
          </NuxtLink>
        </div>
        <div class="flex-auto flex flex-col justify-end divide-y-[1px] divide-background-200">
          <div class="w-full bg-foreground opacity-25 h-[1px]" />
          <NuxtLink
            to="/settings"
            @click="store.isVisible = false"
          >
            <BaseSideBarElement
              type="cog"
              text="Настройки"
              :color="useRouter().currentRoute.value.path === '/settings' ? '#FF4646' : '#EDE8D8'"
            />
          </NuxtLink>
          <NuxtLink
            to="/about"
            @click="store.isVisible = false"
          >
            <BaseSideBarElement
              type="alert-circle"
              text="О программе"
              :color="useRouter().currentRoute.value.path === '/about' ? '#FF4646' : '#EDE8D8'"
            />
          </NuxtLink>
          <BaseSideBarElement
            type="logout"
            text="Выйти из аккаунта"
            color="#EDE8D8"
            @click="user.logout()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { useSideBar } from '~/store/useSideBar'
import { useUser } from '~/store/useUser'
import type { UserData } from '~/types/userData'

const store = useSideBar()
const sideBarEl = ref(null)
const translateTo = ref(null)
const { direction } = useSwipe(sideBarEl, {
  onSwipeEnd() {
    if (direction.value === 'left') store.hide()
  },
})
const user = useUser()
const api = useApi()

const links = ref<{
  name: string
  icon: 'home' | 'license' | 'calendar' | 'mail' | 'bell' | 'photo' | 'chart'
  route: string
}[]>([
  {
    name: 'Новости',
    icon: 'home',
    route: '/news',
  },
  {
    name: 'Блог',
    icon: 'license',
    route: '/blog',
  },
  {
    name: 'Расписание',
    icon: 'calendar',
    route: '/timetable',
  },
  {
    name: 'Сообщения',
    icon: 'mail',
    route: '/messenger',
  },
  {
    name: 'Уведомления',
    icon: 'bell',
    route: '/notifications',
  },
  {
    name: 'Галерея',
    icon: 'photo',
    route: '/gallery',
  },
  {
    name: 'Оценки',
    icon: 'chart',
    route: '/marks',
  },
])
const info = ref()

onMounted(
  async () =>
    (info.value = await api.get<UserData>(
      `/user/info?access_token=${user.data.access_token}`,
    )),
)
</script>
