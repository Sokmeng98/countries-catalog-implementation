<template>
  <div class="relative mt-8">
    <div>
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="search"
        class="block p-4 pl-10 w-full rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search By Country Name"
      />
      <div class="text-red-400 mt-2.5 absolute">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCountryStore } from "../stores/CountryStore";

const countryStore = useCountryStore();
const searchQuery = ref("");
const error = ref("");

watch(searchQuery, (newQuery) => {
  countryStore.searchCountries(newQuery);
});
</script>
