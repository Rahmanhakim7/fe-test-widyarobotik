<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-600 mb-1">
      {{ label }}
    </label>

    <select
      :value="modelValue"
      @change="onChange"
      :disabled="disabled"
      :class="[baseClass, stateClass]"
    >
      <option v-if="placeholder" value="">
        {{ placeholder }}
      </option>

      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <p v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Option = {
  label: string;
  value: string | number;
};

const props = defineProps<{
  modelValue: string | number;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const baseClass =
  "w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white";

const stateClass = computed(() =>
  props.disabled ? "bg-gray-100 cursor-not-allowed" : "",
);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>
