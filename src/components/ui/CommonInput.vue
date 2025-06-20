<template>
  <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
  <input
    v-model="modelValue"
    :type="type"
    class="w-full mt-1 p-2 border rounded"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineModel } from "vue";

interface Props {
  type?: string;
  label?: string;
}

const modelValue = defineModel({ required: true });

withDefaults(defineProps<Props>(), {
  type: "text",
});
</script>
