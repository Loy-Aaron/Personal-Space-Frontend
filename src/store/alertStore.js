import { create } from 'zustand';

const useAlertStore = create((set) => ({
    alert: null,
    type: null,
    setAlert: (alert, type) => {
        set({ alert, type })
    }
}));

export default useAlertStore;