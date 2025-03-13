import { create } from 'zustand';

const useModeStore = create((set) => ({
    mode: 'dark',
    textColor: 'text-amber-50',
    bgColor: 'bg-slate-950',
    borderColor: 'border-amber-50',
    setMode: (mode) => {
        const textColor = mode === 'light' ? 'text-slate-950' : 'text-amber-50';
        const bgColor = mode === 'light' ? 'bg-amber-50' : 'bg-slate-950';
        const borderColor = mode === 'light' ? 'border-slate-950' : 'border-amber-50';
        set({ mode, textColor, bgColor, borderColor });
    }
}));

export default useModeStore;
