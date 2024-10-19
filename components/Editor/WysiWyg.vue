<template>
  <div class="flex flex-col gap-2 rounded-lg p-2 bg-background-100">
    <div class="flex flex-wrap gap-2 bg-background-200 rounded-lg p-2">

    </div>
    <MilkdownProvider>
      <EditorMilkdownEditor ref="content" />
    </MilkdownProvider>
  </div>
</template>


<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import TurndownService from 'turndown';


const content = ref<HTMLElement | null>(null);
const md = ref('Hello, world!');
const turndown = new TurndownService();


function buildHtmlString() {
  const el: Element = content.value?.cloneNode(true) as Element;
  el?.removeChild(el.querySelector('span#hint')!!);
  return el.innerHTML;
}

function buildMarkdownString() {
  const el: Element = content.value?.cloneNode(true) as Element;
  el?.removeChild(el.querySelector('span#hint')!!);
  return turndown.turndown(el.innerHTML);
}

</script>
