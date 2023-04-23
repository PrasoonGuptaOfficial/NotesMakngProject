import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NotesFetchedDate} from '../Helpers/NotesFetchedDate';
import {NotesColors} from '../constants/Colors';
import NotesText from './NotesText';
import NotesDivider from './NotesDivider';
import {NotesIcons} from '../constants/Icon';
import NotesPressable from './NotesPressable';
import {useDispatch, useSelector} from 'react-redux';
import {NotesRootState} from '../Redux/NotesStore';
import {DeleteSingleNote} from '../Redux/AddNotesSlice';
import {
  AddSingleWhistListNote,
  DeleteSingleWhishListNote,
} from '../Redux/AddNotesWhishListSlice';
import {NotesString} from '../constants/NotesString';
import NotesAlertModal from './NotesAlertModal';

export interface NotesFetchedDateState {
  notesCardDay: string;
  notesCardMonth: string;
  notesCardYear: string;
}

const NotesDisplayCard = (props: any): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {AddCategoryDrawer} = useSelector(
    (state: NotesRootState) => state.AddCategoryReducer,
  );
  const [isNotesWhistListSelected, setIsNotesWhishListSelected] = useState(
    props.notesWishlistSelected,
  );
  const [isDeleteAddNotesModal, setIsDeleteAddNotesModal] = useState(false);
  const [isDeSelectWishListNotesModal, setIsDeSelectWishListNotesModal] =
    useState(false);
  const notesCardFetchedDate: NotesFetchedDateState = NotesFetchedDate(
    props.notesCardIdDate,
  );
  const isAddCategoryDeleted = AddCategoryDrawer.some(
    item => item.itemText === props.notesCardSelectedCategory,
  );
  const onPressNavigationDetailHandler = (notesEditable: boolean) => {
    navigation.navigate(NotesString.Navigate_Detail_Page, {
      isNotesEditable: notesEditable,
      ...props,
    });
  };
  const {notesBottomTabBarFocussed} = props;
  const onSingleNoteDeleteHandler = (deletedTitle: string) => {
    dispatch(DeleteSingleNote(deletedTitle));
  };
  const onNotesWhistListSelectedHandler = () => {
    setIsNotesWhishListSelected(true);
    dispatch(
      AddSingleWhistListNote({
        whishListId: Date.now(),
        notesWhishListTitle: props.notesCardTitle,
        notesWhishListDescription: props.notesCardDescription,
        notesWhishListSelectedCategory: props.notesCardSelectedCategory,
      }),
    );
  };
  const onNotesWhistListUnSelectedHandler = () => {
    setIsNotesWhishListSelected(false);
    dispatch(DeleteSingleWhishListNote(props.notesCardTitle));
  };
  return (
    <SafeAreaView
      style={[
        styles.cardNotesLayout,
        {
          height:
            Platform.OS === 'ios'
              ? notesBottomTabBarFocussed
                ? Dimensions.get('window').height / 5.85
                : Dimensions.get('window').height / 4.55
              : notesBottomTabBarFocussed
              ? Dimensions.get('window').height / 6.35
              : Dimensions.get('window').height / 4.9,
        },
      ]}>
      <Pressable onPress={() => onPressNavigationDetailHandler(false)}>
        <View style={styles.cardNotesDateLayout}>
          <NotesText
            notesText={notesCardFetchedDate?.notesCardMonth}
            notesTextStyle={styles.cardNotesDateText}
          />
          <NotesText
            notesText={notesCardFetchedDate?.notesCardDay}
            notesTextStyle={styles.cardNotesDateText}
          />
        </View>
        <NotesText
          notesText={props.notesCardTitle}
          notesTextStyle={styles.cardNotesTextLayout}
        />
        <NotesText
          notesText={props.notesCardSelectedCategory}
          notesTextStyle={styles.cardNotesTextLayout}
        />
        <NotesText
          notesText={props.notesCardDescription}
          notesTextStyle={styles.cardNotesTextLayout}
        />
      </Pressable>
      {!notesBottomTabBarFocussed && (
        <>
          <NotesDivider
            notesEnhancedDividerLineStyle={styles.notesCardDividerLine}
          />
          <View style={styles.notesCardSymbolsLayout}>
            {!isAddCategoryDeleted && (
              <NotesPressable
                notesPressableOnPress={() => {}}
                notesPressableText={NotesIcons.Alert}
                notesPressableTextStyle={[
                  styles.notesCardSymbolTextLayout,
                  styles.notesCardSymbolAlert,
                ]}
              />
            )}
            {isNotesWhistListSelected ? (
              <>
                <NotesPressable
                  notesPressableOnPress={() =>
                    setIsDeSelectWishListNotesModal(true)
                  }
                  notesPressableText={NotesIcons.WhishListSelected}
                  notesPressableTextStyle={styles.notesCardSymbolTextLayout}
                />
                {isDeSelectWishListNotesModal && (
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isDeSelectWishListNotesModal}
                    onRequestClose={() =>
                      setIsDeSelectWishListNotesModal(false)
                    }>
                    <NotesAlertModal
                      notesAlertModalText={
                        NotesString.Alert_Confirm_DeSelect_Wishlist
                      }
                      notesAlertModalConfirmButton={
                        onNotesWhistListUnSelectedHandler
                      }
                      notesAlertModalCloseButton={() =>
                        setIsDeSelectWishListNotesModal(false)
                      }
                    />
                  </Modal>
                )}
              </>
            ) : (
              <NotesPressable
                notesPressableOnPress={onNotesWhistListSelectedHandler}
                notesPressableText={NotesIcons.WhishListUnselected}
                notesPressableTextStyle={styles.notesCardSymbolTextLayout}
              />
            )}
            <NotesPressable
              notesPressableOnPress={() => onPressNavigationDetailHandler(true)}
              notesPressableText={NotesIcons.Edit}
              notesPressableTextStyle={styles.notesCardSymbolTextLayout}
            />
            <>
              <NotesPressable
                notesPressableOnPress={() => setIsDeleteAddNotesModal(true)}
                notesPressableText={NotesIcons.Garbage}
                notesPressableTextStyle={styles.notesCardSymbolTextLayout}
              />
              {isDeleteAddNotesModal && (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isDeleteAddNotesModal}
                  onRequestClose={() => setIsDeleteAddNotesModal(false)}>
                  <NotesAlertModal
                    notesAlertModalText={NotesString.Alert_Confirm_Notes}
                    notesAlertModalConfirmButton={() =>
                      onSingleNoteDeleteHandler(props.notesCardTitle)
                    }
                    notesAlertModalCloseButton={() =>
                      setIsDeleteAddNotesModal(false)
                    }
                  />
                </Modal>
              )}
            </>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardNotesLayout: {
    flex: 1,
    minWidth: Dimensions.get('window').width / 2.3,
    maxWidth: Dimensions.get('window').width / 2.3,
    padding: 8,
    borderWidth: 0.5,
    borderColor: NotesColors.notesDisplayThemeColor,
    backgroundColor: NotesColors.notesDisplayThemeColor,
    borderRadius: 10,
    shadowColor: NotesColors.notesDisplayThemeColor,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardNotesDateLayout: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 5,
    flexDirection: 'row',
  },
  cardNotesDateText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingRight: 2,
    color: NotesColors.drawerItemTextColor,
  },
  cardNotesTextLayout: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    margin: 3,
    color: NotesColors.drawerItemTextColor,
  },
  notesCardDividerLine: {
    marginTop: 1,
    marginLeft: 0,
    marginRight: 0,
    opacity: 0.5,
  },
  notesCardSymbolsLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 3,
  },
  notesCardSymbolTextLayout: {
    fontSize: 22,
    margin: 0,
  },
  notesCardSymbolAlert: {
    color: NotesColors.AlertDisplayThemeColor,
  },
});

export default NotesDisplayCard;
