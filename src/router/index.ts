import { createRouter, createWebHistory } from "vue-router";
import CurrencyConverter from "../pages/CurrencyConverter.vue";

const routes = [
  {
    path: "/currency-converter",
    name: "CurrencyConverter",
    component: CurrencyConverter,
  },
  {
    path: "/",
    redirect: "/currency-converter",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
