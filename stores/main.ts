import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { toast } from "vue3-toastify";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostState {
  allPosts: Post[];
  posts: Post[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  sortDirection: "asc" | "desc";
}

export const usePostStore = defineStore("postStore", {
  state: (): PostState => ({
    allPosts: [],
    posts: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
    sortDirection: "asc",
  }),

  actions: {
    async fetchPosts(page: number = 1) {
      const { $axios } = useNuxtApp();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await $axios.get("/posts");
        this.allPosts = response.data;

        this.calculateTotalPages();
        this.updatePostsForCurrentPage(page);
      } catch (err) {
        this.error = "Failed to load posts";
        toast.error(this.error, { position: "top-right" });
      } finally {
        this.isLoading = false;
      }
    },

    sortPostsById() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";

      this.allPosts.sort((a, b) => (this.sortDirection === "asc" ? a.id - b.id : b.id - a.id));

      this.updatePostsForCurrentPage(this.currentPage);
    },

    updatePostsForCurrentPage(page: number) {
      this.currentPage = page;
      const startIndex = (page - 1) * 10;
      this.posts = this.allPosts.slice(startIndex, startIndex + 10);
    },

    calculateTotalPages() {
      this.totalPages = Math.ceil(this.allPosts.length / 10);
    },

    async createPost(title: string, body: string) {
      const { $axios } = useNuxtApp();
      const newPost = {
        title,
        body,
        userId: 1,
      };

      try {
        const response = await $axios.post("/posts", newPost, {
          headers: { "Content-Type": "application/json" },
        });

        const createdPost = response.data;
        this.allPosts.push(createdPost);
        this.calculateTotalPages();
        this.updatePostsForCurrentPage(this.currentPage);

        toast.success("Post successfully added!", { position: "top-right" });
      } catch (error) {
        this.error = "Failed to create post";
        toast.error(this.error, { position: "top-right" });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.updatePostsForCurrentPage(this.currentPage + 1);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.updatePostsForCurrentPage(this.currentPage - 1);
      }
    },
  },

  getters: {
    getPosts: (state: PostState) => state.posts,
    getIsLoading: (state: PostState) => state.isLoading,
    getCurrentPage: (state: PostState) => state.currentPage,
    getTotalPages: (state: PostState) => state.totalPages,
  },
});
