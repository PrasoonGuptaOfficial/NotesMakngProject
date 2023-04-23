import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {NotesColors} from '../constants/Colors';
import NotesText from './NotesText';
import {NotesString} from '../constants/NotesString';
import NotesTextInput from './NotesTextInput';
import NotesAddCategoryImage from './NotesAddCategoryImage';
import NotesPressable from './NotesPressable';
import {useDispatch} from 'react-redux';
import {AddSingleCategory} from '../Redux/AddCategorySlice';

const NotesAddCategoryModal = (props: any) => {
  const dispatch = useDispatch();
  const [onCategoryNameText, setOnCategoryNameText] = useState('');
  const [onCategoryImageText, setOnCategoryImageText] = useState('');
  const fetchedAddCategoryImage = (imageUri: string) => {
    setOnCategoryImageText(imageUri);
  };
  const onAddCategoryAddButtonHandler = () => {
    if (onCategoryNameText) {
      if (onCategoryImageText) {
        dispatch(
          AddSingleCategory({
            id: Date.now(),
            itemText: onCategoryNameText,
            itemImage: {uri: onCategoryImageText},
          }),
        );
        props.onAddCategoryModalClose();
      } else {
        Alert.alert(NotesString.Error_Category_Url);
      }
    } else {
      Alert.alert(NotesString.Error_Category_Name);
    }
  };
  return (
    <SafeAreaView style={styles.modalViewMainScreen}>
      <View style={styles.modalViewLayout}>
        <NotesText
          notesText={NotesString.Add_Category}
          notesTextStyle={styles.modalViewHeaderTextStyle}
        />
        <NotesTextInput
          categoryText={onCategoryNameText}
          placeHolderText={NotesString.Category_Name_Text}
          categoryOnChangeText={setOnCategoryNameText}
        />
        <NotesAddCategoryImage addCategoryImage={fetchedAddCategoryImage} />
        <View style={styles.modalViewButtonLayout}>
          <NotesPressable
            notesPressableText={NotesString.Add_Button}
            notesPressableOnPress={onAddCategoryAddButtonHandler}
            notesPressableTextStyle={styles.modalViewAddCategoryButton}
          />
          <NotesPressable
            notesPressableText={NotesString.Close_Button}
            notesPressableOnPress={props.onAddCategoryModalClose}
            notesPressableTextStyle={styles.modalViewAddCategoryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalViewMainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  modalViewLayout: {
    width: Dimensions.get('window').width / 1.3,
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 3.75
        : Dimensions.get('window').height / 4.25,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: NotesColors.whiteColor,
    borderColor: NotesColors.whiteColor,
  },
  modalViewHeaderTextStyle: {
    margin: 5,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: NotesColors.modalHeaderTextTheme,
  },
  modalViewButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalViewAddCategoryButton: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesAddCategoryModal;
