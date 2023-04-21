import React from 'react';
import {Button, Text} from 'react-native';
import NotesSafeAreaView from '../Components/NotesSafeAreaView';
import NotesFloatingAction from '../Components/NotesFloatingAction';
import {useDispatch, useSelector} from 'react-redux';
import type {NotesRootState} from '../Redux/NotesStore';
import {increment, incrementByValue} from '../Redux/DummySlice';

const NotesMainScreen = (): JSX.Element => {
  const count = useSelector(
    (state: NotesRootState) => state.DummyReducer.value,
  );
  const dispatch = useDispatch();
  return (
    <NotesSafeAreaView>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button
        title="IncrementByValue"
        onPress={() => dispatch(incrementByValue(5))}
      />
      <NotesFloatingAction />
    </NotesSafeAreaView>
  );
};

export default NotesMainScreen;
