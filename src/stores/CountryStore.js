import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCountryStore = defineStore("countryStore", () => {
  const countries = ref([]);
  const filteredCountries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(1);
  const itemsPerPage = 25;
  const sortOrder = ref(null);

  // display country on page
  const displayedCountries = computed(() => {
    let countriesToShow = [...filteredCountries.value];

    if (sortOrder.value === "asc") {
      countriesToShow.sort((a, b) =>
        a.name.official
          .toLowerCase()
          .localeCompare(b.name.official.toLowerCase())
      );
    } else if (sortOrder.value === "desc") {
      countriesToShow.sort((a, b) =>
        b.name.official
          .toLowerCase()
          .localeCompare(a.name.official.toLowerCase())
      );
    } else {
      countriesToShow = countriesToShow.sort(() => Math.random() - 0.5);
    }

    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return countriesToShow.slice(start, end);
  });

  // total page
  const totalPages = computed(() => {
    return Math.ceil(filteredCountries.value.length / itemsPerPage);
  });

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
      filteredCountries.value = data; // Initialize with all countries
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // search country
  function searchCountries(query) {
    currentPage.value = 1; // Reset to the first page
    if (!query) {
      filteredCountries.value = countries.value;
      return;
    }
    filteredCountries.value = countries.value.filter((country) =>
      country.name.official.toLowerCase().includes(query.toLowerCase())
    );
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  function changeSortOrder(order) {
    sortOrder.value = order;
    currentPage.value = 1; // Reset to the first page on sort change
  }

  return {
    countries,
    filteredCountries,
    displayedCountries,
    loading,
    error,
    currentPage,
    totalPages,
    sortOrder,
    fetchCountries,
    searchCountries,
    goToPage,
    changeSortOrder,
  };
});
