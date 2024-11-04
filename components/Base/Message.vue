<template>
  <div
    class="px-6 flex gap-3 items-center rounded-xl duration-150"
    :class="color"
  >
    <ICheckAlt
      v-if="props.type === 'done'"
      class="h-[48px] w-[48px] fill-red-400"
    />
    <IAlert
      v-else-if="props.type === 'warn'"
      class="h-[48px] w-[48px] fill-red-400 stroke-red-400"
    />
    <IClose
      v-else-if="props.type === 'danger'"
      class="h-[48px] w-[48px] fill-red-400 stroke-red-400"
    />
    <p
      v-if="props.text"
      class="text-sm font-semibold"
      v-text="props.text"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'done' | 'warn' | 'danger'
    icon?: boolean
    text?: string
  }>(),
  {
    type: 'done',
    icon: true,
  },
)

const color = computed(() => {
  if (props.type === 'done') return 'text-green-500'
  if (props.type === 'warn') return 'text-yellow-500'
  if (props.type === 'danger') return 'text-red-500'

  return 'text-green-500'
})
</script>
