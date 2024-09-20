<template>
  <div
    class="px-6 flex gap-3 items-center rounded-xl duration-150"
    :class="properties.color"
  >
    <Icon :name="properties.icon" class="h-[48px] w-[48px]" />
    <p
      v-if="props.text"
      v-text="props.text"
      class="text-sm font-semibold"
    />
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
      return {
        icon: "weui:done2-outlined",
        color: "text-green-500",
      };

    case "warn":
      return {
        icon: "ion:warning-outline",
        color: "text-yellow-500",
      };
    case "danger":
      return {
        icon: "weui:close2-outlined",
        color: "text-red-500",
      };
  }
});
</script>
