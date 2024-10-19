<template>
  <Milkdown />
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/kit/core";
import { nord } from "@milkdown/theme-nord";
import { Milkdown, useEditor } from "@milkdown/vue";
import { commonmark } from "@milkdown/kit/preset/commonmark";

useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, `# Write anything

# Hello
## Hello
### Hello
#### Hello
##### Hello
###### Hello

> Hello, world!

> multiline  
> 
> quote
> > hm
> 
> yeap

Hello world

- hello
- world

- x
- y

1. hello
2. write
`);
    })
    .config(nord)
    .use(commonmark)
);
</script>


<style>
@tailwind base;
@tailwind utilities;

h1 { @apply text-4xl font-bold; }
h2 { @apply text-3xl font-bold; }
h3 { @apply text-2xl font-bold; }
h4 { @apply text-xl font-semibold; }
h5 { @apply text-lg font-semibold; }
h6 { @apply text-base font-semibold; }

blockquote {
  @apply pl-2 border-l-2 border-primary bg-primary/10 rounded-r-md pr-1;
  @apply bg-[url('@/assets/icons/blockquote_1.svg')] bg-origin-content bg-right-top bg-no-repeat
}

div[contenteditable] {
  @apply flex flex-col gap-2;
}

ul {
  @apply list-outside list-disc ml-4;
}

ol {
  @apply list-outside list-decimal ml-4;
}
</style>
