import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import NotesText from './NotesText';
import {NotesColors} from '../constants/Colors';

const NotesPressable = (props: any): JSX.Element => {
  return (
    <Pressable onPress={props.notesPressableOnPress}>
      <NotesText
        notesText={props.notesPressableText}
        notesTextStyle={[
          styles.pressableTextStyle,
          props.notesPressableTextStyle,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableTextStyle: {
    fontSize: 30,
    fontWeight: '600',
    margin: 3,
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesPressable;
