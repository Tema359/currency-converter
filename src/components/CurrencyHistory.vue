<template>
  <ul class="flex flex-col justify-center items-center">
    <li v-for="item in history" :key="item.timestamp" class="mb-2">
      {{ item.amount }} {{ item.from }} = {{ item.value.toFixed(2) }}
      {{ item.to }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type ConvertCurrency } from "../interfaces/currency";

interface Props {
  history: ConvertCurrency[];
}

defineProps<Props>();
</script>
