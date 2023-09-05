import { create } from "zustand";

interface CreateModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateModal = create<CreateModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateModal;
