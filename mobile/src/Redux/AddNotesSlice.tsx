import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AddNotesItem {
  id: number;
  notesTitle: string;
  notesDescription: string;
  notesSelectedCategory: string;
}

export interface AddNotesState {
  AddNotes: AddNotesItem[];
}

const initialState: AddNotesState = {
  AddNotes: [],
};

export const AddNotesSlice = createSlice({
  name: 'AddNotes',
  initialState,
  reducers: {
    AddSingleNote: (state, action: PayloadAction<any>) => {
      let newAddNote = action.payload;
      const existingAddNote = state.AddNotes.find(
        item => item.notesTitle === action.payload.notesTitle,
      );
      state.AddNotes = existingAddNote
        ? state.AddNotes.map(item =>
            item.notesTitle === existingAddNote.notesTitle ? newAddNote : item,
          )
        : [...state.AddNotes, newAddNote];
    },
    DeleteSingleNote: (state, action: PayloadAction<any>) => {
      const AddNoteItemTitle = action.payload;
      state.AddNotes = state.AddNotes.filter(
        item => item.notesTitle !== AddNoteItemTitle,
      );
    },
  },
});

export const {AddSingleNote, DeleteSingleNote} = AddNotesSlice.actions;
export default AddNotesSlice.reducer;
