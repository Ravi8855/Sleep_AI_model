import { create } from "zustand";

const useUserStore = create((set) => ({
  token: localStorage.getItem("token") || null,

  setToken: (token) => {
    console.log('Setting token in localStorage:', token); // Debug log
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useUserStore;
