import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@/app/types/Note';
import { Scan } from '@/app/types/Scan';

export const selectedScanSlice = createSlice({
  name: 'selectedScan',
  initialState: {
    selectedScanId: null,
    notes: [] as Note[],
    selectedScan: null,
  },
  reducers: {
    setSelectedScanId: (state, action) => {
      state.selectedScanId = action.payload;
    },

    setSelectedScan: (state, action) => {
      state.selectedScan = action.payload;
    },

    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },

    resetNotes: (state, action) => {
      state.notes = [] as Note[];
    },

    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { setSelectedScanId , addNote, resetNotes ,setNotes, setSelectedScan } = selectedScanSlice.actions;
export default selectedScanSlice.reducer;
export const selectSelectedScanId = (state:any) => state.selectedScan.selectedScanId;
export const selectSelectedScan = (state:any) => state.selectedScan.selectedScan;
export const selectNotes = (state: any) => state.selectedScan.notes;