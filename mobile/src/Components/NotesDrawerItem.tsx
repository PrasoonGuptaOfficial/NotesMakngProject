import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import NotesImages from './NotesImages';
import {StyleSheet} from 'react-native';
import {NotesColors} from '../constants/Colors';
import {NotesString} from '../constants/NotesString';
import NotesPressable from './NotesPressable';
import {NotesIcons} from '../constants/Icon';
import {useDispatch} from 'react-redux';
import {DeleteSingleCategory} from '../Redux/AddCategorySlice';

const NotesDrawerItem = (props: any): JSX.Element => {
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
                deleteAddCategoryDrawer(props.drawerItemText);
              }}
            />
          </React.Fragment>
        );
      }}
      labelStyle={styles.drawerTextStyle}
    />
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
