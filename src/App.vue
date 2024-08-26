<template>
  <main>
    <div class="container mx-auto sm:px-12">
      <header>
        <div class="px-4">
          <div class="text-4xl font-bold mt-10 inline-block">
            Countries Catalog Implementation
          </div>
          <Search />
        </div>
      </header>
      <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <ul v-if="filteredCountries.length">
          <li v-for="country in filteredCountries" :key="country.cca3">
            {{ country.name.official }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCountryStore } from "./stores/CountryStore";
import Search from "./components/Search.vue";

// Initialize the store
const countryStore = useCountryStore();

countryStore.fetchCountries();

const filteredCountries = computed(() => countryStore.filteredCountries);
const loading = computed(() => countryStore.loading);
const error = computed(() => countryStore.error);
</script>
