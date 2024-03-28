import create from 'zustand';

interface AuthState {
  token: string | null;
  user: any; 
  userId: string | null; 
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; 
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  userId: localStorage.getItem('userId') || null, 
  
  setToken: (token) => {
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
    set({ token });
  },
  
  setUser: (user) => {
    if (user === null) {
      localStorage.removeItem('user');
      localStorage.removeItem('userId'); 
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user._id); 
    }
    set({ user, userId: user?._id || null });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); 
    set({ token: null, user: null, userId: null });
  },
}));

export default useAuthStore;
