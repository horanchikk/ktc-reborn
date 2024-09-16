<template>
    <!-- TODO: add animations -->
  <div class="px-6 py-2 flex gap-3 items-center bg-green-900 rounded-xl border-[1px] border-green-700 hover:border-green-500 duration-150">
    <Icon :name="properties.icon" class="h-7 w-7" :class="properties.color" />
    <p v-if="props.text" v-text="props.text" class="text-xl" :class="properties.color" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "done" | "warn" | "danger";
    icon?: boolean;
    text?: string;
  }>(),
  {
    type: "done",
    icon: true,
  }
);

const properties = computed(() => {
    switch (props.type) {
        case "done":
            // TODO: add accent and secondary
            return {
                icon: "weui:done2-outlined",
                color: "text-green-400"
            }
            
        case 'warn':
            return {
                icon: "ion:warning-outline",
                color: "text-yellow-400"
            }
        case 'danger':
            return {
                icon: "weui:close2-outlined",
                color: "text-red-400"
            }
    }
})

console.log(properties.value)
</script>
