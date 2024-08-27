<template>
  <main>
    <div class="container mx-auto sm:px-12">
      <header>
        <div class="px-4">
          <div class="text-4xl font-bold mt-10 inline-block">
            Countries Catalog Implementation
          </div>
          <Search ref="searchRef" />
          <SortPagination @reset="handleReset" />
        </div>
      </header>
      <div>
        <div v-if="loading" class="text-center mt-4">Loading...</div>
        <div v-if="error" class="text-center text-red-500 mt-4">
          {{ error }}
        </div>

        <CountryList
          v-if="displayedCountries.length"
          :countries="displayedCountries"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCountryStore } from "./stores/CountryStore";
import Search from "./components/Search.vue";
import SortPagination from "./components/SortPagination.vue";
import CountryList from "./components/CountryList.vue";

const searchRef = ref(null);

// Initialize the store
const countryStore = useCountryStore();
countryStore.fetchCountries();

const displayedCountries = computed(() => countryStore.displayedCountries);
const loading = computed(() => countryStore.loading);
const error = computed(() => countryStore.error);

const handleReset = () => {
  if (searchRef.value) {
    searchRef.value.clearSearch();
  }
};
</script>
