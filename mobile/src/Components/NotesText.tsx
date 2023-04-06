import React from 'react';
import {Text} from 'react-native';

const NotesText = (props: any): JSX.Element => {
  return <Text style={props.notesTextStyle}>{props.notesText}</Text>;
};

export default NotesText;
