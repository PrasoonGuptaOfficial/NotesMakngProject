import React, {useCallback, useState} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {NotesIcons} from '../constants/Icon';
import {NotesString} from '../constants/NotesString';
import NotesText from './NotesText';
import {NotesColors} from '../constants/Colors';
import NotesPressable from './NotesPressable';
import * as ImagePicker from 'react-native-image-picker';
import {NotesImagePickerOptions} from '../constants/NotesOptions';
import NotesAddCategoryImagePreviewModal from './NotesAddCategoryImagePreviewModal';

const NotesAddCategoryImage = (props: any): JSX.Element => {
  const [onErrorDisplay, setOnErrorDisplay] = useState(false);
  const [onImageUriSave, setOnImageUriSave] = useState('');
  const [onImageUriSaveFlag, setOnImageUriSaveFlag] = useState(false);
  const [onAddCategoryImagePreviewFlag, setOnAddCategoryImagePreviewFlag] =
    useState(false);
  const [onAddCategoryImageUri, setOnAddCategoryImageUri] = useState('');
  const onCameraClickHandler = useCallback(() => {
    ImagePicker.launchCamera(NotesImagePickerOptions, response => {
      if (response?.errorCode) {
        setOnImageUriSaveFlag(false);
        setOnImageUriSave('');
        setOnAddCategoryImageUri('');
      } else {
        response?.assets?.map(({uri, type}) => {
          if (type === 'image/jpeg' || type === 'image/jpg') {
            if (uri) {
              let ImgTypeUri: string[] = uri.split('.');
              let fileName = `file: ${Date.now()}.${
                ImgTypeUri[ImgTypeUri?.length - 1]
              }`;
              setOnErrorDisplay(false);
              setOnImageUriSaveFlag(true);
              setOnImageUriSave(fileName);
              setOnAddCategoryImageUri(uri);
              props.addCategoryImage(uri);
            } else {
              setOnErrorDisplay(true);
              setOnImageUriSaveFlag(false);
              setOnImageUriSave('');
              setOnAddCategoryImageUri('');
            }
          } else {
            setOnErrorDisplay(true);
            setOnImageUriSaveFlag(false);
            setOnImageUriSave('');
            setOnAddCategoryImageUri('');
          }
        });
      }
    });
  }, [props]);
  const onGalleryClickHandler = useCallback(() => {
    ImagePicker.launchImageLibrary(NotesImagePickerOptions, response => {
      if (response?.errorCode) {
        setOnImageUriSaveFlag(false);
        setOnImageUriSave('');
        setOnAddCategoryImageUri('');
      } else {
        setOnErrorDisplay(false);
        setOnImageUriSaveFlag(true);
        response?.assets?.map(({uri, type}) => {
          if (type === 'image/jpeg' || type === 'image/jpg') {
            if (uri) {
              let ImgTypeUri = uri.split('.');
              let fileName = `file: ${Date.now()}.${
                ImgTypeUri[ImgTypeUri?.length - 1]
              }`;
              setOnErrorDisplay(false);
              setOnImageUriSaveFlag(true);
              setOnImageUriSave(fileName);
              setOnAddCategoryImageUri(uri);
              props.addCategoryImage(uri);
            } else {
              setOnErrorDisplay(true);
              setOnImageUriSaveFlag(false);
              setOnImageUriSave('');
              setOnAddCategoryImageUri('');
            }
          } else {
            setOnErrorDisplay(true);
            setOnImageUriSaveFlag(false);
            setOnImageUriSave('');
            setOnAddCategoryImageUri('');
          }
        });
      }
    });
  }, [props]);
  const onViewPhotoClickHandler = useCallback(() => {
    if (onAddCategoryImageUri) {
      setOnAddCategoryImagePreviewFlag(true);
    } else {
      setOnAddCategoryImagePreviewFlag(false);
    }
  }, [onAddCategoryImageUri]);
  const onDeleteClickHandler = useCallback(() => {
    setOnImageUriSave('');
    setOnImageUriSaveFlag(false);
    setOnAddCategoryImageUri('');
    setOnErrorDisplay(false);
    setOnAddCategoryImagePreviewFlag(false);
  }, []);
  const onAddCategoryImagePreviewCloseHandler = useCallback(() => {
    setOnAddCategoryImagePreviewFlag(false);
  }, []);
  return (
    <View style={styles.modalViewImageLayout}>
      <View style={styles.modalViewImageInputLayout}>
        {!onImageUriSaveFlag && (
          <NotesText
            notesText={NotesString.Category_Image_Text}
            notesTextStyle={styles.modalViewImageTextLayout}
          />
        )}
        {onImageUriSaveFlag && (
          <NotesText
            notesText={onImageUriSave}
            notesTextStyle={styles.modalViewImageTextLayout}
          />
        )}
      </View>
      <View style={styles.modalViewImageButtonLayout}>
        {!onImageUriSaveFlag && (
          <>
            <NotesPressable
              notesPressableText={NotesIcons.Camera}
              notesPressableOnPress={onCameraClickHandler}
            />
            <NotesPressable
              notesPressableText={NotesIcons.Gallery}
              notesPressableOnPress={onGalleryClickHandler}
            />
          </>
        )}
        {onImageUriSaveFlag && (
          <>
            <NotesPressable
              notesPressableText={NotesIcons.ViewPhoto}
              notesPressableOnPress={onViewPhotoClickHandler}
            />
            <NotesPressable
              notesPressableText={NotesIcons.Garbage}
              notesPressableOnPress={onDeleteClickHandler}
            />
          </>
        )}
        {onAddCategoryImagePreviewFlag && (
          <NotesAddCategoryImagePreviewModal
            AddCategoryImagePreviewFlag={onAddCategoryImagePreviewFlag}
            AddCategoryImagePreviewClose={onAddCategoryImagePreviewCloseHandler}
            AddCategoryImagePreviewUri={onAddCategoryImageUri}
          />
        )}
        {onErrorDisplay && (
          <>{Alert.alert('Please select the appropriate Image')}</>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalViewImageLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalViewImageInputLayout: {
    width: Dimensions.get('window').width / 2.05,
    borderBottomWidth: 1,
    borderBottomColor: NotesColors.placeHolderTextInputThemeColor,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  modalViewImageButtonLayout: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2,
  },
  modalViewImageTextLayout: {
    color: NotesColors.placeHolderTextInputThemeColor,
  },
});

export default NotesAddCategoryImage;
