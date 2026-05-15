import { create } from 'zustand';

interface StreamState {
  focusedId: string | null;
  activeAudioId: string | null;
  hoveredId: string | null;
  isMutedAll: boolean;
  hasInteracted: boolean;
  
  setFocusedId: (id: string | null) => void;
  setActiveAudioId: (id: string | null) => void;
  setHoveredId: (id: string | null) => void;
  toggleMuteAll: () => void;
  setHasInteracted: (val: boolean) => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  focusedId: null,
  activeAudioId: null,
  hoveredId: null,
  isMutedAll: true,
  hasInteracted: false,

  setFocusedId: (id) => set({ focusedId: id }),
  setActiveAudioId: (id) => set({ activeAudioId: id, isMutedAll: id === null }),
  setHoveredId: (id) => set((state) => ({ 
    hoveredId: id,
  })),
  toggleMuteAll: () => set((state) => ({ isMutedAll: !state.isMutedAll })),
  setHasInteracted: (val) => set({ hasInteracted: val }),
}));
