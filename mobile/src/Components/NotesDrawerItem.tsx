import {DrawerItem} from '@react-navigation/drawer';
import React, {useState} from 'react';
import NotesImages from './NotesImages';
import {Modal, StyleSheet} from 'react-native';
import {NotesColors} from '../constants/Colors';
import {NotesString} from '../constants/NotesString';
import NotesPressable from './NotesPressable';
import {NotesIcons} from '../constants/Icon';
import {useDispatch} from 'react-redux';
import {DeleteSingleCategory} from '../Redux/AddCategorySlice';
import NotesAlertModal from './NotesAlertModal';

const NotesDrawerItem = (props: any): JSX.Element => {
  const [isDeleteAddCategoryDrawer, setIsDeleteAddCategoryDrawer] =
    useState(false);
  const dispatch = useDispatch();
  const deleteAddCategoryDrawer = (drawerItem: string) => {
    dispatch(DeleteSingleCategory(drawerItem));
  };
  return props.drawerItemText === NotesString.Add_Category ||
    props.drawerItemText === NotesString.All_Notes_Category ? (
    <DrawerItem
      label={props.drawerItemText}
      onPress={props.drawerItemPress}
      // eslint-disable-next-line react/no-unstable-nested-components
      icon={() => {
        return (
          <NotesImages
            notesImageSource={props.notesDrawerItemImage}
            notesImageStyle={styles.imageStyle}
          />
        );
      }}
      labelStyle={styles.drawerTextStyle}
    />
  ) : (
    <>
      <DrawerItem
        label={props.drawerItemText}
        onPress={props.drawerItemPress}
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => {
          return (
            <React.Fragment>
              <NotesImages
                notesImageSource={props.notesDrawerItemImage}
                notesImageStyle={styles.imageStyle}
              />
              <NotesPressable
                notesPressableText={NotesIcons.Garbage}
                notesPressableOnPress={() => {
                  setIsDeleteAddCategoryDrawer(true);
                }}
              />
            </React.Fragment>
          );
        }}
        labelStyle={styles.drawerTextStyle}
      />
      {isDeleteAddCategoryDrawer && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteAddCategoryDrawer}
          onRequestClose={() => setIsDeleteAddCategoryDrawer(false)}>
          <NotesAlertModal
            notesAlertModalText={NotesString.Alert_Confirm_Category}
            notesAlertModalCloseButton={() =>
              setIsDeleteAddCategoryDrawer(false)
            }
            notesAlertModalConfirmButton={() =>
              deleteAddCategoryDrawer(props.drawerItemText)
            }
          />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
  },
  drawerTextStyle: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    color: NotesColors.drawerItemTextColor,
  },
});

export default NotesDrawerItem;
