import { create } from 'zustand';
import api from '../config/axios.js';
import useLoadingStore from './loadingStore.js';

const useUserStore = create((set) => ({
    user: null,
    getAuthUser: async () => {
        const setIsLoading = useLoadingStore.getState().setIsLoading;
        try {
            setIsLoading(true);
            const res = await api.get('/auth/');
            set({ user: res.data.user });
        } catch (error) {
            set({ user: null });
        } finally {
            setIsLoading(false);
        }
    },
    setUser: (user) => set({ user })
}));

export default useUserStore;