<template>
  <table class="min-w-full table-auto border-collapse border border-gray-400">
    <thead>
      <tr>
        <th class="border px-4 py-2 cursor-pointer" @click="$emit('sortById')">
          ID
          <span v-if="sortDirection === 'asc'">▲</span>
          <span v-else>▼</span>
        </th>
        <th class="border px-4 py-2">Title</th>
        <th class="border px-4 py-2">Body</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td class="border px-4 py-2 w-1/12">{{ post.id }}</td>
        <td class="border px-4 py-2 w-5/12">{{ post.title }}</td>
        <td class="border px-4 py-2 w-1/2">{{ post.body }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  posts: {
    type: Array as PropType<Array<{ id: number; title: string; body: string }>>,
    required: true
  },
  sortDirection: {
    type: String,
    required: true
  }
});
</script>
