import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AddNotesWhishListItem {
  whishListId: number;
  notesWhishListTitle: string;
  notesWhishListDescription: string;
  notesWhishListSelectedCategory: string;
}

export interface AddNotesWhishListState {
  AddWhishListNotes: AddNotesWhishListItem[];
}

const initialState: AddNotesWhishListState = {
  AddWhishListNotes: [],
};

export const AddNotesWhishListSlice = createSlice({
  name: 'AddWhistListNotes',
  initialState,
  reducers: {
    AddSingleWhistListNote: (state, action: PayloadAction<any>) => {
      let newAddWhishListNote = action.payload;
      const existingAddWhishListNote = state.AddWhishListNotes.find(
        item => item.notesWhishListTitle === action.payload.notesWhishListTitle,
      );
      state.AddWhishListNotes = existingAddWhishListNote
        ? state.AddWhishListNotes.map(item =>
            item.notesWhishListTitle ===
            existingAddWhishListNote.notesWhishListTitle
              ? newAddWhishListNote
              : item,
          )
        : [...state.AddWhishListNotes, newAddWhishListNote];
    },
    DeleteSingleWhishListNote: (state, action: PayloadAction<any>) => {
      const AddWhishListNoteItemTitle = action.payload;
      state.AddWhishListNotes = state.AddWhishListNotes.filter(
        item => item.notesWhishListTitle !== AddWhishListNoteItemTitle,
      );
    },
  },
});

export const {AddSingleWhistListNote, DeleteSingleWhishListNote} =
  AddNotesWhishListSlice.actions;
export default AddNotesWhishListSlice.reducer;
