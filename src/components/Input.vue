<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-600 mb-1">
      {{ label }}
    </label>

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      :class="[baseClass, stateClass]"
    />

    <p v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const baseClass =
  "w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

const stateClass = computed(() =>
  props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
