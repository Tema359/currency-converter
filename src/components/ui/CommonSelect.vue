<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1">
      {{ label }}
    </label>
    <select v-model="modelValue" class="w-full p-2 border rounded">
      <option v-if="!options.length" disabled value="" selected>
        No options
      </option>

      <option
        v-for="option in options"
        :key="option.id"
        :value="option.short_code"
      >
        {{ option[optionLabel] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineModel } from "vue";

interface Props {
  options: any[];
  label?: string;
  optionLabel?: string;
  optionValue?: string;
}

const modelValue = defineModel({ required: true });

withDefaults(defineProps<Props>(), {
  optionLabel: "name",
  optionValue: "id",
});
</script>
