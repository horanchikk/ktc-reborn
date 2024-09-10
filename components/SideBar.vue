<template>
    <div v-if="store.isRendered" ref="sideBarEl" class="w-screen h-screen fixed top-0 left-0 z-10">
        <div @click="store.hide" :class="store.isVisible ? 'bg-opacity-50' : 'bg-opacity-0'" class="w-full h-full bg-black animate__animated animate__faster animate__fadeIn duration-500" />
        <div  :class="store.isVisible ? 'animate__animated animate__faster animate__slideInLeft' : 'animate__animated animate__faster animate__slideOutLeft'" class="absolute top-0 w-3/4 h-full bg-stone-900" :style="`left: -${translateTo}px`"></div>
    </div>
</template>

<script setup lang="ts">
import { useSideBar } from '~/store/useSideBar';
import { useSwipe } from '@vueuse/core'

const store = useSideBar()
const sideBarEl = ref(null)
const translateTo = ref(null)
const {direction} = useSwipe(sideBarEl, {
    onSwipeEnd() {
        if (direction.value === 'left')
            store.hide()
    }
})
</script>

style