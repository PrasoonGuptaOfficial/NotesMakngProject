import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import NotesImages from './NotesImages';
import {StyleSheet} from 'react-native';
import {NotesColors} from '../constants/Colors';

const NotesDrawerItem = (props: any): JSX.Element => {
  return (
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
