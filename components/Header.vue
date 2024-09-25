<template>
  <header
    class="w-full flex justify-between gap-5 bg-background-100 p-3 animate__animated animate__fadeInDown animate__faster"
  >
    <Icon
      @click="sideBar.show()"
      name="solar:hamburger-menu-outline"
      class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150"
    />
    <div class="flex-auto flex items-center font-semibold">UserName</div>
    <Icon
      name="basil:other-2-outline"
      @click="show"
      class="w-8 h-8 hover:opacity-50 cursor-pointer duration-150"
    />
    <div
      v-if="showMenu"
      class="absolute top-0 left-0 w-screen h-screen bg-transparent z-50"
    >
      <div
        class="w-full h-full flex justify-end items-start"
        :class="showAnim ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
        style="--animate-duration: 200ms"
        @click="hide"
      >
        <div class="m-3 w-44 flex flex-col divide-y-2 divide-stone-700 drop-shadow-lg">
          <button
            v-for="(item, idx) in menu"
            class="flex gap-5 p-3 items-center bg-background-100 hover:bg-stone-700 animate__animated animate__fadeInDown duration-150"
            :class="{
                'rounded-t-md': idx === 0,
                'rounded-b-md': idx === menu.length - 1,
            }"
            :style="`--animate-duration: ${(idx + 1) * 50}ms`"
            @click="item.action"
          >
            <Icon :name="item.icon" class="w-7 h-7 text-stone-500" />
            <p v-text="item.name" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSideBar } from "~/store/useSideBar";
import { useUser } from "~/store/useUser";

const sideBar = useSideBar();
const user = useUser();
const showMenu = ref(false);
const showAnim = ref(false);
function hide() {
    showAnim.value = false;
    setTimeout(() => {
        showMenu.value = false;
    }, 100);
}
function show() {
    showMenu.value = true;
    showAnim.value = true;
}
const menu = [
  {
    name: "Debug",
    icon: "material-symbols:bug-report-outline",
    action: () => debugForm.value = true,
  },
];
</script>

