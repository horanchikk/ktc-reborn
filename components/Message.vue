<template>
  <div
    class="px-6 py-2 flex gap-3 items-center rounded-xl border-[1px] duration-150"
    :class="[properties.colors.bg, properties.colors.border, properties.colors.hoverBorder]"
  >
    <Icon :name="properties.icon" class="h-[48px] w-[48px]" />
    <p
      v-if="props.text"
      v-text="props.text"
      class="text-sm text-white"
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
        colors: {
          bg: "bg-green-900",
          border: "border-green-700",
          hoverBorder: "hover:border-green-500",
        },
      };

    case "warn":
      return {
        icon: "ion:warning-outline",
        colors: {
          bg: "bg-yellow-900",
          border: "border-yellow-700",
          hoverBorder: "hover:border-yellow-500",
        },
      };
    case "danger":
      return {
        icon: "weui:close2-outlined",
        colors: {
          bg: "bg-red-900",
          border: "border-red-700",
          hoverBorder: "hover:border-red-500",
        },
      };
  }
});
</script>
