import { create } from "zustand";

interface SideBarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBarModal = create<SideBarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBarModal;
