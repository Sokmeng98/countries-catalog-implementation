<template>
  <main>
    <div class="container mx-auto sm:px-12">
      <header>
        <div class="px-4">
          <div class="text-4xl font-bold mt-10 inline-block">
            Countries Catalog Implementation
          </div>
          <Search />
          <SortPagination />
        </div>
      </header>
      <div>
        <div v-if="loading" class="text-center mt-4">Loading...</div>
        <div v-if="error" class="text-center text-red-500 mt-4">
          {{ error }}
        </div>

        <div>
          <div
            v-if="displayedCountries.length"
            class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-6 my-4 md:mb-12"
          >
            <div
              v-for="(country, index) in displayedCountries"
              :key="index"
              class="rounded-xl border shadow-lg overflow-hidden"
            >
              <div
                class="aspect-[1.5] p-4 cursor-pointer"
                @click="viewCountryDetails(country)"
              >
                <img
                  :src="country.flags.png"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <div
                  class="font-bold truncate cursor-pointer"
                  :title="country.name.official"
                  @click="viewCountryDetails(country)"
                >
                  {{ country.name.official }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- displaying country details -->
        <TransitionRoot appear :show="isDialogOpen" as="template">
          <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <div class="aspect-[1.5]">
                      <img
                        :src="currentCountry?.flags.png"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <DialogTitle
                      as="h3"
                      class="text-lg font-bold leading-6 text-gray-900 mt-4"
                    >
                      {{ currentCountry?.name.official }}
                    </DialogTitle>
                    <div class="mt-2">
                      <div>
                        <span class="font-medium">CCA2:</span>
                        {{ currentCountry?.cca2 }}
                      </div>
                      <div>
                        <span class="font-medium">CCA3:</span>
                        {{ currentCountry?.cca3 }}
                      </div>
                      <div>
                        <span class="font-medium">Alternative Spellings:</span>
                        {{ currentCountry?.altSpellings.join(", ") }}
                      </div>
                      <div>
                        <span class="font-medium">IDD:</span>
                        {{ currentCountry?.idd.root
                        }}{{ currentCountry?.idd.suffixes.join(", ") }}
                      </div>
                    </div>

                    <div class="mt-4">
                      <button
                        type="button"
                        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 w-full"
                        @click="closeModal"
                      >
                        Close
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCountryStore } from "./stores/CountryStore";
import Search from "./components/Search.vue";
import SortPagination from "./components/SortPagination.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const isDialogOpen = ref(false);
const currentCountry = ref(null);

const viewCountryDetails = (country) => {
  currentCountry.value = country;
  isDialogOpen.value = true;
};

const closeModal = () => {
  isDialogOpen.value = false;
};

// Initialize the store
const countryStore = useCountryStore();

countryStore.fetchCountries();

const displayedCountries = computed(() => countryStore.displayedCountries);
const loading = computed(() => countryStore.loading);
const error = computed(() => countryStore.error);
</script>
