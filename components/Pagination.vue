<template>
  <div class="flex justify-center my-4 mt-auto">
    <button
      class="px-4 py-2 mx-1 bg-gray-300 rounded"
      :disabled="currentPage === 1"
      @click="$emit('prevPage')"
    >
      Previous
    </button>
    <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="px-4 py-2 mx-1 bg-gray-300 rounded"
      :disabled="currentPage === totalPages"
      @click="$emit('nextPage')"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
</script>
