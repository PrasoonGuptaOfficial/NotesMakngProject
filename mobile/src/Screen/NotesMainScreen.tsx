import React from 'react';
import NotesSafeAreaView from '../Components/NotesSafeAreaView';
import NotesFloatingAction from '../Components/NotesFloatingAction';
import NotesDisplayScreen from './NotesDisplayScreen';
import {useSelector} from 'react-redux';
import {NotesRootState} from '../Redux/NotesStore';

const NotesMainScreen = (): JSX.Element => {
  const {AddCategoryDrawer} = useSelector(
    (state: NotesRootState) => state.AddCategoryReducer,
  );
  return (
    <NotesSafeAreaView>
      <NotesDisplayScreen />
      {AddCategoryDrawer.length > 0 && <NotesFloatingAction />}
    </NotesSafeAreaView>
  );
};

export default NotesMainScreen;
