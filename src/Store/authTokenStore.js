import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
  persist(
    (set) => ({
      token:"",
      setToken: (token) => set(() => ({ token: token })),
      clearToken: () => set(() =>({ token: "" })),
    }),
    {
      name: "token-storage",
    },
  ),
);

export default useTokenStore;
