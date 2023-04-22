import {combineReducers, configureStore} from '@reduxjs/toolkit';
import DummyReducer from './DummySlice';
import AddCategoryReducer from './AddCategorySlice';
import AddNotesSlice from './AddNotesSlice';
import AddNotesWhishListSlice from './AddNotesWhishListSlice';

export const NotesStore = configureStore({
  reducer: combineReducers({
    DummyReducer,
    AddCategoryReducer,
    AddNotesSlice,
    AddNotesWhishListSlice,
  }),
});

export type NotesRootState = ReturnType<typeof NotesStore.getState>;
export type NotesAppDispatch = typeof NotesStore.dispatch;
