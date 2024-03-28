// src/stores/useAuthStore.ts
import create from 'zustand';

interface AuthState {
  token: string | null;
  user: any; // You can replace 'any' with a more specific type for your user
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; // Again, replace 'any' with a user type
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;
