import {configureStore} from '@reduxjs/toolkit';
import DummyReducer from './DummySlice';

export const NotesStore = configureStore({
  reducer: DummyReducer,
});

export type NotesRootState = ReturnType<typeof NotesStore.getState>;
export type NotesAppDispatch = typeof NotesStore.dispatch;
