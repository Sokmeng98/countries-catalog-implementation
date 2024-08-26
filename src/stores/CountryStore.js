import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountryStore = defineStore("countryStore", () => {
  const countries = ref([]);
  const filteredCountries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // fetch api
  async function fetchCountries() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await response.json();
      countries.value = data;
      filteredCountries.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // implement search function
  function searchCountries(query) {
    if (!query) {
      filteredCountries.value = countries.value;
      return;
    }
    filteredCountries.value = countries.value.filter((country) =>
      country.name.official.toLowerCase().includes(query.toLowerCase())
    );
  }

  return {
    countries,
    filteredCountries,
    loading,
    error,
    fetchCountries,
    searchCountries,
  };
});
