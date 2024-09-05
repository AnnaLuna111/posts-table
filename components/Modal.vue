<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="bg-white rounded-lg p-6 w-1/4">
      <h2 class="text-lg font-semibold mb-4">Create New Post</h2>
      <form @submit.prevent="createPost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="body" class="block text-sm font-medium">Body</label>
          <textarea
            id="body"
            v-model="body"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Post
          </button>
          <button
            type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '../stores/main';
import { useModalStore } from '../stores/modal';

const props = defineProps<{ show: boolean }>();
const postStore = usePostStore();
const modalStore = useModalStore();

const title = ref('');
const body = ref('');

const createPost = async () => {
  await postStore.createPost(title.value, body.value);
  title.value = '';
  body.value = '';
  modalStore.closeModal();
};

const cancel = () => {
  title.value = '';
  body.value = '';
  modalStore.closeModal();
};
</script>

