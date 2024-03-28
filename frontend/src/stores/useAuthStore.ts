import create from 'zustand';

interface AuthState {
  token: string | null;
  user: any; 
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; 
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  
  token: localStorage.getItem('token') || null, 
  user: null,
  setToken: (token) => {
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('token'); 
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
