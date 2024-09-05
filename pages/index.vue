<template>
  <div>
    <div v-if="postStore.getIsLoading" class="flex items-center justify-center h-screen">
      <span class="loader"></span> Loading posts...
    </div>

    <div v-if="!postStore.getIsLoading" class="flex flex-col container mx-auto h-screen">
      <ClientOnly>
        <h1 class="text-5xl font-extrabold mb-6">Posts table</h1>
        <Table :posts="posts" :sortDirection="sortDirection" @sortById="sortById" />

        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-6 self-end" @click="modalStore.openModal">
          Create New Post
        </button>

        <Pagination :currentPage="postStore.getCurrentPage" :totalPages="postStore.getTotalPages"
          @nextPage="postStore.nextPage" @prevPage="postStore.prevPage" />
      </ClientOnly>
    </div>
    <Modal :show="modalStore.isModalOpen" @close="modalStore.closeModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePostStore } from '../stores/main';
import { useModalStore } from '../stores/modal';

const postStore = usePostStore();
const modalStore = useModalStore();

const posts = computed(() => postStore.getPosts);
const sortDirection = computed(() => postStore.sortDirection);

const sortById = () => {
  postStore.sortPostsById();
};

onMounted(() => {
  postStore.fetchPosts();
});
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
