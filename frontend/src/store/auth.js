import { create } from "zustand";
const storedUser = sessionStorage.getItem("user");
const storedToken = sessionStorage.getItem("token");
const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  setAuth: ({ user, token }) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
