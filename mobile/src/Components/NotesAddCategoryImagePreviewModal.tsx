import React from 'react';
import {Dimensions, Image, Modal, StyleSheet} from 'react-native';
import NotesPressable from './NotesPressable';
import {NotesString} from '../constants/NotesString';
import {NotesColors} from '../constants/Colors';

const NotesAddCategoryImagePreviewModal = (props: any): JSX.Element => {
  return (
    <Modal
      animationType="slide"
      visible={props.AddCategoryImagePreviewFlag}
      onRequestClose={props.AddCategoryImagePreviewClose}>
      <Image
        resizeMethod="scale"
        resizeMode="cover"
        source={{uri: props.AddCategoryImagePreviewUri}}
        style={styles.imageUriStyle}
      />
      <NotesPressable
        notesPressableOnPress={props.AddCategoryImagePreviewClose}
        notesPressableText={NotesString.Close_Button}
        notesPressableTextStyle={styles.AddCategoryCloseButtonStyle}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageUriStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddCategoryCloseButtonStyle: {
    fontSize: 18,
    fontWeight: '500',
    margin: 3,
    textAlign: 'center',
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesAddCategoryImagePreviewModal;
