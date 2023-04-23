import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import NotesText from './NotesText';
import {NotesString} from '../constants/NotesString';
import {NotesColors} from '../constants/Colors';
import NotesTextInput from './NotesTextInput';
import NotesPressable from './NotesPressable';
import NotesDropdown from './NotesDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {AddSingleNote} from '../Redux/AddNotesSlice';
import {NotesRootState} from '../Redux/NotesStore';

const NotesAddModal = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const [onAddNotesTitle, setOnAddNotesTitle] = useState('');
  const [onAddNotesDescription, setOnAddNotesDescription] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState(undefined);
  const {AddCategoryDrawer} = useSelector(
    (state: NotesRootState) => state.AddCategoryReducer,
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let dropDownData: Array<{label: string; value: string}> = [];
  useEffect(() => {
    AddCategoryDrawer.map((item: {itemText: any}) => {
      dropDownData.push({label: item.itemText, value: item.itemText});
    });
  }, [AddCategoryDrawer, dropDownData]);
  const onAddNotesButtonHandler = () => {
    if (onAddNotesTitle) {
      if (onAddNotesDescription) {
        if (dropDownData.length > 0 && selectedDropdown?.value) {
          dispatch(
            AddSingleNote({
              id: Date.now(),
              notesTitle: onAddNotesTitle,
              notesDescription: onAddNotesDescription,
              notesSelectedCategory: selectedDropdown?.value,
            }),
          );
          props.onAddNotesModalClose();
        } else {
          Alert.alert(NotesString.Error_Category_Add_Notes);
        }
      } else {
        Alert.alert(NotesString.Error_Description_Notes);
      }
    } else {
      Alert.alert(NotesString.Error_Title_Notes);
    }
  };
  return (
    <SafeAreaView style={styles.addNotesModalViewMainScreen}>
      <View style={styles.addNotesModalViewLayout}>
        <NotesText
          notesText={NotesString.Add_Notes}
          notesTextStyle={styles.addNotesModalViewHeaderTextStyle}
        />
        <NotesTextInput
          categoryText={onAddNotesTitle}
          placeHolderText={NotesString.Add_Notes_Title}
          categoryOnChangeText={setOnAddNotesTitle}
        />
        <NotesTextInput
          categoryText={onAddNotesDescription}
          placeHolderText={NotesString.Add_Notes_Description}
          categoryOnChangeText={setOnAddNotesDescription}
        />
        {dropDownData && (
          <NotesDropdown
            label={NotesString.Add_Notes_Category}
            data={dropDownData}
            onSelect={setSelectedDropdown}
          />
        )}
        <View style={styles.addNotesModalViewButtonLayout}>
          <NotesPressable
            notesPressableText={NotesString.Add_Button}
            notesPressableOnPress={onAddNotesButtonHandler}
            notesPressableTextStyle={styles.addNotesModalViewAddCategoryButton}
          />
          <NotesPressable
            notesPressableText={NotesString.Close_Button}
            notesPressableOnPress={props.onAddNotesModalClose}
            notesPressableTextStyle={styles.addNotesModalViewAddCategoryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addNotesModalViewMainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  addNotesModalViewLayout: {
    width: Dimensions.get('window').width / 1.3,
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height / 3.15
        : Dimensions.get('window').height / 3.65,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: NotesColors.whiteColor,
    borderColor: NotesColors.whiteColor,
  },
  addNotesModalViewHeaderTextStyle: {
    margin: 5,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: NotesColors.modalHeaderTextTheme,
  },
  addNotesModalViewButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addNotesModalViewAddCategoryButton: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesAddModal;
