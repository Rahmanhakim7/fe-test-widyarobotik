<template>
  <component
    :is="tag"
    :to="to"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    @click="handleClick"
    :class="[baseClass, variantClass, stateClass]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
type ButtonVariant = "primary" | "danger" | "success" | "secondary";
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: ButtonVariant;
    to?: string | object;
  }>(),
  {
    type: "button",
    disabled: false,
    variant: "primary",
  },
);

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const tag = computed(() => (props.to ? "router-link" : "button"));

const baseClass =
  "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none select-none";

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
};

const variantClass = computed(() => variantClassMap[props.variant]);

const stateClass = computed(() =>
  props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
);

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.to) return;
  emit("click", event);
};
</script>
