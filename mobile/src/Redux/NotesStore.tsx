import {combineReducers, configureStore} from '@reduxjs/toolkit';
import DummyReducer from './DummySlice';
import AddCategoryReducer from './AddCategorySlice';

export const NotesStore = configureStore({
  reducer: combineReducers({
    DummyReducer,
    AddCategoryReducer,
  }),
});

export type NotesRootState = ReturnType<typeof NotesStore.getState>;
export type NotesAppDispatch = typeof NotesStore.dispatch;
