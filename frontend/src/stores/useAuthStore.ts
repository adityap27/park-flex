/* Author: Jay Rana */
import create from 'zustand';

// Defines the shape of the authentication state and its updater functions.
interface AuthState {
  token: string | null;
  user: any; 
  userId: string | null; 
  setToken: (token: string | null) => void;
  setUser: (user: any) => void; 
  logout: () => void;
}

// Creates a store to manage authentication state.
const useAuthStore = create<AuthState>((set) => ({
  
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  userId: localStorage.getItem('userId') || null, 
  
  // Function to set or remove the authentication token in both state and localStorage
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
  
  // Function to clear the authentication state and remove related data from localStorage.
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); 
    set({ token: null, user: null, userId: null });
  },
}));

export default useAuthStore;
