import { create } from 'zustand'
import useAlertStore from './alertStore.js'
import api from '../config/axios.js'
import useLoadingStore from '../store/loadingStore.js'

const useDiaryStore = create((set) => ({
    showCreateEntry: false,
    setShowCreateEntry: (showCreateEntry) => set({ showCreateEntry }),

    showEditEntry: false,
    entryData: {},
    setShowEditEntry: (showEditEntry, entryData) => set({ showEditEntry, entryData }),

    showConfirmDeletion: false,
    setShowConfirmDeletion: (showConfirmDeletion) => set({ showConfirmDeletion }),

    diary: [],
    fetchDiary: async () => {
        const setAlert = useAlertStore.getState().setAlert;
        const setIsLoading = useLoadingStore.getState().setIsLoading;

        setIsLoading(true)
        try {
            const response = await api.get('/diary')

            const diary = response.data?.diary || []
            set({ diary })

        } catch (error) {
            setAlert('Network Error', 'error')
        } finally {
            setIsLoading(false)
        }
    },
    createNewEntry: async (entryData) => {
        const setAlert = useAlertStore.getState().setAlert;
        const setIsLoading = useLoadingStore.getState().setIsLoading;

        setIsLoading(true)
        try {
            const response = await api.post('/diary', entryData)

            const newEntry = response.data.newEntry

            set((state) => ({ diary: [...state.diary, newEntry] }))
            set({ showCreateEntry: false })
            setAlert('New Entry created', 'success')

        } catch (error) {
            setAlert('Failed To Create Entry', 'error')
        } finally {
            setIsLoading(false)
        }
    },
    updateEntry: async (eid, updateData) => {
        const setAlert = useAlertStore.getState().setAlert;
        const setIsLoading = useLoadingStore.getState().setIsLoading;

        setIsLoading(true)
        try {
            const response = await api.put(`/diary/${eid}`, updateData)

            const updatedEntry = response.data.updatedEntry

            set((state) => ({ diary: state.diary.map(entry => entry._id === eid ? updatedEntry : entry) }))
            set({ showEditEntry: false })
            setAlert('Entry Updated', 'success')

        } catch (error) {
            setAlert('Failed To Update Entry', 'error')
        } finally {
            setIsLoading(false)
        }
    },
    deleteEntry: async (eid) => {
        const setAlert = useAlertStore.getState().setAlert;
        const setIsLoading = useLoadingStore.getState().setIsLoading;

        setIsLoading(true)
        try {
            await api.delete(`/diary/${eid}`);

            set((state) => ({ diary: state.diary.filter(entry => entry._id !== eid) }));
            setAlert('Entry Deleted', 'success');

        } catch (error) {
            setAlert('Failed To Delete Entry', 'error');
        } finally {
            setIsLoading(false)
        }
    },
    deleteDiary: async () => {
        const setAlert = useAlertStore.getState().setAlert;
        const setIsLoading = useLoadingStore.getState().setIsLoading;

        setIsLoading(true)
        try {
            await api.delete('/diary');

            set({ diary: [] })
            set({ showConfirmDeletion: false });
            setAlert('Diary Deleted', 'success');

        } catch (error) {
            setAlert('Failed To Delete Diary', 'error');
        } finally {
            setIsLoading(false)
        }
    }
}));

export default useDiaryStore;