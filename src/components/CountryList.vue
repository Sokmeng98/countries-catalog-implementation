<template>
  <div>
    <!--Check if there are any countries to display and Loop through the countries array and create a card for each country -->
    <div
      v-if="countries.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
    >
      <div
        v-for="(country, index) in countries"
        :key="index"
        class="rounded-xl border shadow-lg overflow-hidden bg-white"
      >
        <div
          class="aspect-[1.5] p-4 cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          @click="viewCountryDetails(country)"
        >
          <img :src="country.flags.png" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <div
            class="font-bold truncate cursor-pointer hover:text-blue-600 transition duration-300"
            :title="country.name.official"
            @click="viewCountryDetails(country)"
          >
            {{ country.name.official }}
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for displaying detailed information about the selected country -->
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
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

// Define the props that this component expects
const props = defineProps({
  countries: Array,
});

const isDialogOpen = ref(false);
const currentCountry = ref(null);

// Function to open the modal and display details of the selected country
const viewCountryDetails = (country) => {
  currentCountry.value = country;
  isDialogOpen.value = true;
};

// Function to close the modal dialog
const closeModal = () => {
  isDialogOpen.value = false;
};
</script>
