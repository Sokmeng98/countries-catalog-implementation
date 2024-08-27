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
        <Spinner v-if="loading" />
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
import Spinner from "./components/Spinner.vue";

const searchRef = ref(null);

// Initialize the store
const countryStore = useCountryStore();
countryStore.fetchCountries();

const displayedCountries = computed(() => countryStore.displayedCountries);
const loading = computed(() => countryStore.loading);
const error = computed(() => countryStore.error);

// Method to handle the reset event emitted by the SortPagination component
const handleReset = () => {
  if (searchRef.value) {
    // Clear the search input when the reset button is clicked
    searchRef.value.clearSearch();
  }
};
</script>
