<template>
  <div ref="root" class="flex flex-col gap-2 rounded-lg p-2 bg-background-100">
    <div
      class="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 duration-300 transition-all"
      :class="{
        'pointer-events-auto': showHeadingPopup,
        'pointer-events-none': !showHeadingPopup,
      }"
    >
      <div
        class="absolute left-0 right-0 top-0 bottom-0 duration-300 transition-all z-10"
        :class="{
          'bg-background-100/50 backdrop-blur-sm opacity-100': showHeadingPopup,
          'backdrop-blur-none opacity-0': !showHeadingPopup,
        }"
        @click="toggleHeadingPopup"
      ></div>
      <div
        class="flex flex-col items-center justify-center bg-background-100
               rounded-lg p-2 z-20 duration-300 transition-all drop-shadow-lg"
        :class="{
          'opacity-100 scale-100': showHeadingPopup,
          'opacity-0 scale-75 translate-y-10': !showHeadingPopup,
        }"
      >
        <span>Выберите стиль заголовка</span>
        <div class="flex divide-y divide-foreground/20">
          <h1 class="py-1" @click="chooseHeading(1)">Heading 1</h1>
          <h2 class="py-1" @click="chooseHeading(2)">Heading 2</h2>
          <h3 class="py-1" @click="chooseHeading(3)">Heading 3</h3>
          <h4 class="py-1" @click="chooseHeading(4)">Heading 4</h4>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 bg-background-200 rounded-lg p-2">
      <img src="@/assets/icons/heading 1.svg" alt="set heading" @click="toggleHeadingPopup">
      <div class="bg-foreground/25 w-[2px] min-h-full"></div>
      <img src="@/assets/icons/bold 1.svg" alt="set bold" @click="applyBold">
      <img src="@/assets/icons/italic 1.svg" alt="set italic" @click="applyItalic">
      <div class="bg-foreground/25 w-[2px] min-h-full"></div>
      <img src="@/assets/icons/link 1.svg" alt="set link" @click="applyLink" >
      <div class="bg-foreground/25 w-[2px] min-h-full"></div>
      <img src="@/assets/icons/lines.svg" alt="set list" @click="applyList" >
      <div class="bg-foreground/25 w-[2px] min-h-full"></div>
      <img src="@/assets/icons/blockquote.svg" alt="set list" @click="applyQuote" >
    </div>
    <MilkdownProvider>
      <EditorMilkdownEditor ref="editor" />
    </MilkdownProvider>
  </div>
</template>


<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";


const showHeadingPopup = ref(false);
const root = ref<HTMLElement | null>(null);
const editor = ref<{
  content?: string,
  appendMarkdown?: (str: string) => void,
  toggleBold?: () => void,
  toggleItalic?: () => void,
  toggleLink?: () => void,
  toggleList?: () => void,
  toggleQuote?: () => void,
  getMdText?: () => void,
}>();


function toggleHeadingPopup() {
  showHeadingPopup.value = !showHeadingPopup.value;
}

function chooseHeading(type: number) {
  toggleHeadingPopup();
  editor.value?.appendMarkdown!!(`\n\n${'#'.repeat(type)} Заголовок`);
}

const applyBold = () => editor.value?.toggleBold!!();
const applyItalic = () => editor.value?.toggleItalic!!();
const applyLink = () => editor.value?.toggleLink!!();
const applyList = () => editor.value?.toggleList!!();
const applyQuote = () => editor.value?.toggleQuote!!();

const getMdText = () => editor.value?.getMdText!!();


defineExpose({
  getMdText,
})

</script>
