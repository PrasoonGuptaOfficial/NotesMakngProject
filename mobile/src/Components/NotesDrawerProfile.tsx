import React from 'react';
import {Pressable} from 'react-native';
import NotesImages from './NotesImages';

const NotesDrawerProfile = (props: any): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <NotesImages
        notesImageSource={require('../Assets/Gif/NotesProfile.gif')}
        notesImageStyle={props.profilePictureStyle}
      />
    </Pressable>
  );
};

export default NotesDrawerProfile;
