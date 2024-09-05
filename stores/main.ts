import { defineStore } from "pinia";
import axios from "axios";

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
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.allPosts = response.data;

        this.totalPages = Math.ceil(this.allPosts.length / 10);

        this.updatePostsForCurrentPage(page);
      } catch (err) {
        this.error = "Failed to load posts";
      } finally {
        this.isLoading = false;
      }
    },

    sortPostsById() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";

      this.allPosts.sort((a, b) => {
        if (this.sortDirection === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });

      this.updatePostsForCurrentPage(this.currentPage);
    },

    updatePostsForCurrentPage(page: number) {
      this.currentPage = page;
      const startIndex = (page - 1) * 10;
      this.posts = this.allPosts.slice(startIndex, startIndex + 10);
    },

    createPost(title: string, body: string) {
      const newPost = {
        id: Date.now(),
        title,
        body,
        userId: 1,
      };

      this.allPosts.unshift(newPost);

      this.totalPages = Math.ceil(this.allPosts.length / 10);

      this.updatePostsForCurrentPage(this.currentPage);
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
    getPosts(state: PostState) {
      return state.posts;
    },
    getIsLoading(state: PostState) {
      return state.isLoading;
    },
    getCurrentPage(state: PostState) {
      return state.currentPage;
    },
    getTotalPages(state: PostState) {
      return state.totalPages;
    },
  },
});
