import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import NotesText from './NotesText';
import NotesPressable from './NotesPressable';
import {NotesString} from '../constants/NotesString';
import {NotesColors} from '../constants/Colors';

const NotesAlertModal = (props: any): JSX.Element => {
  return (
    <SafeAreaView style={styles.addNotesModalViewMainScreen}>
      <View style={styles.addNotesModalViewLayout}>
        <NotesText
          notesText={props.notesAlertModalText}
          notesTextStyle={styles.addNotesModalViewHeaderTextStyle}
        />
        <View style={styles.addNotesModalViewButtonLayout}>
          <NotesPressable
            notesPressableText={NotesString.Confirm_Button}
            notesPressableOnPress={props.notesAlertModalConfirmButton}
            notesPressableTextStyle={styles.addNotesModalViewAddCategoryButton}
          />
          <NotesPressable
            notesPressableText={NotesString.Close_Button}
            notesPressableOnPress={props.notesAlertModalCloseButton}
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
        ? Dimensions.get('window').height / 6.5
        : Dimensions.get('window').height / 7.25,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: NotesColors.whiteColor,
    borderColor: NotesColors.whiteColor,
  },
  addNotesModalViewHeaderTextStyle: {
    margin: 8,
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
    marginVertical: 8,
    marginHorizontal: 5,
    padding: 3,
    color: NotesColors.textDarkThemeColor,
  },
});

export default NotesAlertModal;
