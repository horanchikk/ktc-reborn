<template>
  <nav class="relative w-full h-20 flex items-end animate__animated animate__fadeInUp animate__faster">
    <div class="w-full rounded-t-xl bg-stone-800 h-14" />
    <div
      class="top-0 left-0 absolute w-full h-full grid grid-cols-3 grid-rows-1 items-end"
    >
      <NuxtLink
        v-for="(item, idx) in items"
        :key="idx"
        :to="item.link"
        class="h-full flex justify-center items-end text-center"
      >
        <div
          @click="selectedIdx = idx"
          class="flex flex-col items-center justify-center bg-stone-800 px-4 cursor-pointer duration-300"
          :class="{
            'h-20 rounded-t-full': idx === selectedIdx,
            'h-14': idx !== selectedIdx,
          }"
        >
          <Icon :name="item.icon" class="w-10 h-10 duration-300" />
          <p :class="selectedIdx === idx ? 'opacity-100 mt-1 text-sm' : 'opacity-0 text-[0px] mt-0'" class="duration-300" v-text="item.name" />
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const items = ref([
  {
    name: "Новости",
    icon: "hugeicons:news",
    link: "/news"
  },
  {
    name: "Расписание",
    icon: "mdi:timetable",
    link: "/timetable"
  },
  {
    name: "Профиль",
    icon: "ph:student-bold",
    link: "/profile"
  },
]);

const route = useRoute();
const selectedIdx = ref(null);
watch(() => route.fullPath, () => {
  selectedIdx.value = items.value.findIndex(el => el.link === route.fullPath)
})
</script>
