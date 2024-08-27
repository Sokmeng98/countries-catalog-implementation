<template>
  <div
    class="pagination-controls flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0"
  >
    <!-- Sort control buttons: Ascending, Descending, and Reset -->
    <div class="sort-controls flex space-x-4">
      <button
        @click="setSortOrder('asc')"
        :disabled="totalPages === 0"
        :class="[
          'px-4 py-2 rounded transition-colors duration-300 font-medium',
          totalPages === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200'
            : sortOrder === 'asc'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white',
        ]"
      >
        Asc
      </button>
      <button
        @click="setSortOrder('desc')"
        :disabled="totalPages === 0"
        :class="[
          'px-4 py-2 rounded transition-colors duration-300 font-medium',
          totalPages === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200'
            : sortOrder === 'desc'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white',
        ]"
      >
        Desc
      </button>
      <button
        @click="resetSortOrder"
        :class="[
          'px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 font-medium',
          sortOrder === null ? 'opacity-50 cursor-not-allowed' : '',
        ]"
        :disabled="sortOrder === null"
      >
        Reset
      </button>
    </div>
    <!-- Pagination controls: Previous and Next buttons, and page numbers -->
    <div class="pagination flex items-center space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1 || totalPages === 1"
        class="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
      >
        Prev
      </button>

      <span class="flex space-x-1">
        <span
          v-for="page in paginationPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'cursor-pointer px-3 py-1 rounded-full transition-colors duration-300 font-medium',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white',
          ]"
        >
          {{ page }}
        </span>
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages || totalPages <= 1"
        class="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCountryStore } from "../stores/CountryStore";

const emit = defineEmits(["reset"]);

const countryStore = useCountryStore();
const currentPage = computed(() => countryStore.currentPage);
const totalPages = computed(() => countryStore.totalPages);
const sortOrder = computed(() => countryStore.sortOrder);

// Computed property to generate an array of page numbers optimized for mobile view
const paginationPages = computed(() => {
  if (totalPages.value <= 5) {
    return [...Array(totalPages.value).keys()].map((i) => i + 1);
  } else {
    const pages = [];
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, "...", totalPages.value);
    } else if (currentPage.value > totalPages.value - 3) {
      pages.push(
        1,
        "...",
        totalPages.value - 2,
        totalPages.value - 1,
        totalPages.value
      );
    } else {
      pages.push(1, "...", currentPage.value, "...", totalPages.value);
    }
    return pages;
  }
});

// Function to navigate to the previous page
function prevPage() {
  if (currentPage.value > 1) {
    countryStore.goToPage(currentPage.value - 1);
  }
}

// Function to navigate to the next page
function nextPage() {
  if (currentPage.value < totalPages.value) {
    countryStore.goToPage(currentPage.value + 1);
  }
}

// Function to navigate to a specific page
function goToPage(page) {
  if (typeof page === "number") {
    countryStore.goToPage(page);
  }
}

// Function to change the sorting order (ascending or descending)
function setSortOrder(order) {
  countryStore.changeSortOrder(order);
}

// Function to reset the sorting order to its default state and clear any search results
function resetSortOrder() {
  countryStore.changeSortOrder(null);
  countryStore.searchCountries("");
  emit("reset");
}
</script>
