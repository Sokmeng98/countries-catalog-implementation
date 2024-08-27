import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Define the Pinia store named 'countryStore' using the Composition API pattern
export const useCountryStore = defineStore("countryStore", () => {
  const countries = ref([]);
  const filteredCountries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(1);
  const itemsPerPage = 25;
  const sortOrder = ref(null);

  // Computed property to determine which countries should be displayed on the current page
  const displayedCountries = computed(() => {
    // Create a copy of the filtered countries array for sorting and pagination
    let countriesToShow = [...filteredCountries.value];

    // Sort the countries based on the current sort order
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
      // If no sort order is specified, display countries in random order
      countriesToShow = countriesToShow.sort(() => Math.random() - 0.5);
    }

    // Calculate the starting and ending index
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return countriesToShow.slice(start, end);
  });

  // Computed property to calculate the total number of pages based on the number of filtered countries
  const totalPages = computed(() => {
    return Math.ceil(filteredCountries.value.length / itemsPerPage);
  });

  // Asynchronous function to fetch all countries from the API
  async function fetchCountries() {
    loading.value = true;
    error.value = null;
    try {
      const response = await new Promise(
        (resolve) =>
          setTimeout(
            () => fetch("https://restcountries.com/v3.1/all").then(resolve),
            1000
          ) // Simulate a 2-second delay
      );
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

  // Function to filter countries based on a search query
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

  // Function to change the current page, ensuring it stays within valid bounds
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  // Function to change the sort order, resetting to the first page after a sort order change
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
