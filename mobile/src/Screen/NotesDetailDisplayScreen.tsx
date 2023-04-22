import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NotesColors} from '../constants/Colors';
import NotesPressable from '../Components/NotesPressable';
import {NotesIcons} from '../constants/Icon';
import {NotesFetchedDate} from '../Helpers/NotesFetchedDate';
import NotesText from '../Components/NotesText';
import {NotesString} from '../constants/NotesString';
import NotesTextInput from '../Components/NotesTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {NotesRootState} from '../Redux/NotesStore';
import NotesDropdown from '../Components/NotesDropdown';
import {AddSingleNote} from '../Redux/AddNotesSlice';

export interface NotesFetchedDateState {
  notesCardDay: string;
  notesCardMonth: string;
  notesCardYear: string;
}

const NotesDetailDisplayScreen = (props: any): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    notesCardIdDate,
    notesCardTitle,
    notesCardDescription,
    notesCardSelectedCategory,
    isNotesEditable,
  } = props.route.params;
  const notesCardFetchedDate: NotesFetchedDateState =
    NotesFetchedDate(notesCardIdDate);
  const {notesCardDay, notesCardMonth, notesCardYear} = notesCardFetchedDate;
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
  const [onUpdatedNotesTitle, setOnUpdatedNotesTitle] =
    useState(notesCardTitle);
  const [onUpdatedNotesDescription, setOnUpdatedNotesDescription] =
    useState(notesCardDescription);
  const [updatedDropdown, setUpdatedDropdown] = useState(
    notesCardSelectedCategory,
  );
  const onReturnDisplayScreenHandler = () => {
    navigation.goBack();
  };
  const onUpdateNotesButtonHandler = () => {
    if (onUpdatedNotesTitle) {
      if (onUpdatedNotesDescription) {
        if (dropDownData.length > 0) {
          dispatch(
            AddSingleNote({
              id: Date.now(),
              notesTitle: onUpdatedNotesTitle,
              notesDescription: onUpdatedNotesDescription,
              notesSelectedCategory:
                typeof updatedDropdown === 'string'
                  ? updatedDropdown
                  : updatedDropdown.value,
            }),
          );
          onReturnDisplayScreenHandler();
        } else {
          throw new Error('Please add the Category');
        }
      } else {
        throw new Error('Please provide the Description of Notes!!');
      }
    } else {
      throw new Error('Please provide the Title of Notes!!');
    }
  };
  return (
    <SafeAreaView style={styles.notesDetailsPageLayout}>
      <View style={styles.notesDetailsDateLayout}>
        <NotesText
          notesText={notesCardDay}
          notesTextStyle={styles.notesDateDetailsText}
        />
        <NotesText
          notesText={NotesIcons.DateSeparation}
          notesTextStyle={styles.notesDateDetailsText}
        />
        <NotesText
          notesText={notesCardMonth}
          notesTextStyle={styles.notesDateDetailsText}
        />
        <NotesText
          notesText={NotesIcons.DateSeparation}
          notesTextStyle={styles.notesDateDetailsText}
        />
        <NotesText
          notesText={notesCardYear}
          notesTextStyle={styles.notesDateDetailsText}
        />
        <NotesPressable
          notesPressableOnPress={onReturnDisplayScreenHandler}
          notesPressableText={NotesIcons.Return}
          notesPressableTextStyle={styles.returnNotesTextDisplay}
        />
      </View>
      {isNotesEditable ? (
        <NotesTextInput
          categoryText={onUpdatedNotesTitle}
          placeHolderText={NotesString.Add_Notes_Title}
          categoryOnChangeText={setOnUpdatedNotesTitle}
        />
      ) : (
        <NotesText
          notesText={notesCardTitle}
          notesTextStyle={styles.notesTitleDescDetailsText}
        />
      )}
      {isNotesEditable ? (
        <NotesTextInput
          categoryText={onUpdatedNotesDescription}
          placeHolderText={NotesString.Add_Notes_Description}
          categoryOnChangeText={setOnUpdatedNotesDescription}
        />
      ) : (
        <NotesText
          notesText={notesCardDescription}
          notesTextStyle={styles.notesTitleDescDetailsText}
        />
      )}
      {isNotesEditable ? (
        dropDownData && (
          <NotesDropdown
            label={notesCardSelectedCategory}
            data={dropDownData}
            onSelect={setUpdatedDropdown}
          />
        )
      ) : (
        <View style={styles.notesCategoryDetailsLayout}>
          <NotesText
            notesText={NotesString.Category_Name_Text}
            notesTextStyle={styles.notesTitleDescDetailsText}
          />
          <NotesText
            notesText={NotesIcons.ColonSeparation}
            notesTextStyle={styles.notesTitleDescDetailsText}
          />
          <NotesText
            notesText={notesCardSelectedCategory}
            notesTextStyle={styles.notesTitleDescDetailsText}
          />
        </View>
      )}
      {isNotesEditable && (
        <View style={styles.notesDetailsDateLayout}>
          <NotesPressable
            notesPressableText={NotesString.Add_Button}
            notesPressableOnPress={onUpdateNotesButtonHandler}
            notesPressableTextStyle={styles.notesAddDetailsButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notesDetailsPageLayout: {
    flex: 1,
    backgroundColor: NotesColors.mainLightThemeColor,
  },
  notesDetailsDateLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notesDateDetailsText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 6,
    padding: 1,
    color: NotesColors.drawerItemTextColor,
  },
  returnNotesTextDisplay: {
    fontSize: 24,
    fontWeight: '600',
    margin: 3,
    color: NotesColors.textDarkThemeColor,
  },
  notesTitleDescDetailsText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginVertical: 3,
    marginHorizontal: 5,
    padding: 1,
    color: NotesColors.drawerItemTextColor,
    textAlign: 'left',
  },
  notesCategoryDetailsLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  notesAddDetailsButton: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesDetailDisplayScreen;
