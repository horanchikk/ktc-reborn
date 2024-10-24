<template>
  <Milkdown ref="content" />
</template>

<script setup lang="ts">
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core'
import { nord } from '@milkdown/theme-nord'
import { Milkdown, useEditor } from '@milkdown/vue'
import {
  commonmark, toggleStrongCommand,
  toggleEmphasisCommand, toggleLinkCommand,
  wrapInOrderedListCommand,
  wrapInBlockquoteCommand,
} from '@milkdown/kit/preset/commonmark'
import { getMarkdown, replaceAll, callCommand } from '@milkdown/kit/utils'
import { history } from '@milkdown/kit/plugin/history'

const content = ref<HTMLElement>()
let editor: Editor

useEditor((root) => {
  editor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
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
`)
    })
    .config(nord)
    .use(commonmark)
    .use(history)
  return editor
},
)

function appendMarkdown(str: string) {
  const text = editor.action(getMarkdown())
  editor.action(replaceAll(text + str))
}

const toggleBold = () => editor.action(callCommand(toggleStrongCommand.key))
const toggleItalic = () => editor.action(callCommand(toggleEmphasisCommand.key))
const toggleLink = () => editor.action(callCommand(toggleLinkCommand.key))
const toggleList = () => editor.action(callCommand(wrapInOrderedListCommand.key))
const toggleQuote = () => editor.action(callCommand(wrapInBlockquoteCommand.key))

const getMdText = () => editor.action(getMarkdown())

defineExpose({
  content,
  appendMarkdown,
  toggleBold,
  toggleItalic,
  toggleList,
  toggleLink,
  toggleQuote,
  getMdText,
})
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
  @apply bg-[url('@/assets/icons/blockquote.svg')] bg-origin-content bg-right-top bg-no-repeat
}

div[contenteditable] {
  @apply flex flex-col gap-2;
}

a {
  @apply underline decoration-primary/50 text-primary cursor-pointer;
}

ul {
  @apply list-outside list-disc ml-4;
}

ol {
  @apply list-outside list-decimal ml-4;
}
</style>
