import { defineStore } from "pinia";

interface ModalState {
  isModalOpen: boolean;
}

export const useModalStore = defineStore("modalStore", {
  state: (): ModalState => ({
    isModalOpen: false,
  }),

  actions: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },
  },
});
