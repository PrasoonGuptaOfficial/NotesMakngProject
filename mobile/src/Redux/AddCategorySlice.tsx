import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AddCategoryDrawerItems {
  id: number;
  itemText: string;
  itemImage: {uri: string} | number;
}

export interface AddCategoryState {
  AddCategoryDrawer: AddCategoryDrawerItems[];
  SelectSingleCategory: string;
}

const initialState: AddCategoryState = {
  AddCategoryDrawer: [],
  SelectSingleCategory: '',
};

export const AddCategorySlice = createSlice({
  name: 'AddCategory',
  initialState,
  reducers: {
    AddSingleCategory: (state, action: PayloadAction<any>) => {
      let newAddCategory = action.payload;
      const existingAddCategory = state.AddCategoryDrawer.find(
        item => item.itemText === action.payload.itemText,
      );
      state.AddCategoryDrawer = existingAddCategory
        ? state.AddCategoryDrawer.map(item =>
            item.itemText === existingAddCategory.itemText
              ? newAddCategory
              : item,
          )
        : [...state.AddCategoryDrawer, newAddCategory];
    },
    DeleteSingleCategory: (state, action: PayloadAction<any>) => {
      const AddCategoryItemText = action.payload;
      state.AddCategoryDrawer = state.AddCategoryDrawer.filter(
        item => item.itemText !== AddCategoryItemText,
      );
    },
    SelectedSingleCategory: (state, action: PayloadAction<any>) => {
      state.SelectSingleCategory = action.payload;
    },
  },
});

export const {AddSingleCategory, DeleteSingleCategory, SelectedSingleCategory} =
  AddCategorySlice.actions;
export default AddCategorySlice.reducer;
