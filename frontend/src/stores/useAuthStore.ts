// src/stores/useAuthStore.ts
import create from 'zustand';

interface AuthState {
  token: string | null;
  user: any; 
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; 
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
