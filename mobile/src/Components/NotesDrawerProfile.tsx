import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

const NotesDrawerProfile = (props: any): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Image
        source={require('../Gif/NotesProfile.gif')}
        style={styles.profilePictureView}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profilePictureView: {
    width: 27,
    height: 27,
    marginLeft: 3,
  },
});

export default NotesDrawerProfile;
