import * as ImagePicker from 'react-native-image-picker';

export const NotesImagePickerOptions:
  | ImagePicker.CameraOptions
  | ImagePicker.ImageLibraryOptions = {
  mediaType: 'photo',
  includeExtra: true,
  includeBase64: false,
  quality: 1,
  selectionLimit: 0,
  saveToPhotos: true,
};
