import { create } from 'zustand';

interface UserState {
  username: string;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  isLoggedIn: false,
  login: (username: string) => set({ username, isLoggedIn: true }),
  logout: () => set({ username: '', isLoggedIn: false }),
}));

export default useUserStore;
