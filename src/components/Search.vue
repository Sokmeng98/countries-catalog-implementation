<template>
  <div class="relative mt-8">
    <div class="flex items-center justify-center">
      <div class="relative w-full max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          class="block w-full p-4 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
          placeholder="Search by country name..."
        />
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none"
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
        <button
          v-if="searchQuery"
          class="absolute inset-y-0 right-0 flex items-center pr-4 text-red-500 cursor-pointer hover:text-red-700 focus:outline-none"
          @click="clearSearch"
          aria-label="Clear search"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="error" class="text-red-500 mt-2 text-center">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
import { useCountryStore } from "../stores/CountryStore";

const countryStore = useCountryStore();
const searchQuery = ref("");
const error = ref("");

watch(searchQuery, (newQuery) => {
  countryStore.searchCountries(newQuery);
});

const clearSearch = () => {
  searchQuery.value = "";
  countryStore.searchCountries("");
};

defineExpose({
  clearSearch,
});
</script>
