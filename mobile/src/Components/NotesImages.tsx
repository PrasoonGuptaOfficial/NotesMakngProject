import React from 'react';
import {Image} from 'react-native';

const NotesImages = (props: any): JSX.Element => {
  return (
    <Image source={props.notesImageSource} style={props.notesImageStyle} />
  );
};

export default NotesImages;
