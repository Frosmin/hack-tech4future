import { create } from "zustand";

export const usePath = create((set) => ({
  currentPath: "/",
  updatePath: (newPath) => set(() => ({ currentPath: newPath })),
}));
