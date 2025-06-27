<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow mb-8">
    <h1 class="text-2xl font-semibold mb-4 text-center">Currency Converter</h1>
    <div class="mb-4">
      <CommonSelect
        v-model="fromCurrency"
        label="From Currency"
        :options="currencies"
        :optionValue="OPTION_VALUE"
      />
    </div>
    <div class="mb-4">
      <CommonSelect
        v-model="toCurrency"
        label="To Currency"
        :options="currencies"
        :optionValue="OPTION_VALUE"
      />
    </div>
    <div class="mb-4">
      <CommonInput v-model.number="amount" type="number" />
    </div>
    <button
      :disabled="Boolean(errorMessage)"
      @click="handleConvert"
      class="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 hover:bg-blue-700"
    >
      Convert
    </button>

    <div v-if="convertedAmount" class="mt-6 text-center">
      <p class="text-lg font-semibold">
        {{ convertedAmount.amount }} {{ fromCurrency }} =
        {{ convertedAmount.value.toFixed(2) }}
        {{ toCurrency }}
      </p>
    </div>
    <p v-if="errorMessage" class="mt-4 text-red-600 font-medium">
      {{ errorMessage }}
    </p>
  </div>
  <CurrencyHistory :history="currencyHistories" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getCurrencies, convertCurrency } from "../api/currency";
import type { ConvertCurrency, Currency } from "../interfaces/currency";
import CommonSelect from "./ui/CommonSelect.vue";
import CommonInput from "./ui/CommonInput.vue";
import CurrencyHistory from "./CurrencyHistory.vue";
import { extractApiError } from "../utils/handleApiError";

const OPTION_VALUE = "short_code";

const currencyHistories = ref<ConvertCurrency[]>([]);
const currencies = ref<Currency[]>([]);
const fromCurrency = ref("USD");
const toCurrency = ref("EUR");
const amount = ref(1);
const convertedAmount = ref<ConvertCurrency | null>(null);
const errorMessage = ref<string | null>(null);

const MAX_HISTORY_RECORDS = 5;

const fetchCurrencies = async () => {
  try {
    currencies.value = await getCurrencies();
  } catch (error) {
    errorMessage.value = extractApiError(error);
  }
};

const isHistoryLenghtExceed = computed(
  () => currencyHistories.value.length - 1 === MAX_HISTORY_RECORDS,
);

const removeLatestHistoryRecord = () => {
  // currencyHistories.value.pop();
  currencyHistories.value = currencyHistories.value.slice(0, -1); // Prefer do not mutate original array
};

const addHistoryRecord = () => {
  if (convertedAmount.value) {
    currencyHistories.value = [
      convertedAmount.value,
      ...currencyHistories.value,
    ];

    if (isHistoryLenghtExceed.value) {
      removeLatestHistoryRecord();
    }
  }
};

const handleConvert = async () => {
  try {
    convertedAmount.value = await convertCurrency({
      from: fromCurrency.value,
      to: toCurrency.value,
      amount: amount.value,
    });
    addHistoryRecord();
  } catch (error) {
    errorMessage.value = extractApiError(error);
  }
};

onMounted(fetchCurrencies);
</script>
