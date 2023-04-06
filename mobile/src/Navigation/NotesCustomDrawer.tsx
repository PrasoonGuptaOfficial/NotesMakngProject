import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import NotesDrawerProfile from '../Components/NotesDrawerProfile';
import NotesDivider from '../Components/NotesDivider';
import NotesText from '../Components/NotesText';
import {NotesColors} from '../constants/Colors';
import NotesDrawerItem from '../Components/NotesDrawerItem';
import {CustomDrawerData} from '../constants/CustomDrawerData';
import {NotesString} from '../constants/NotesString';

const NotesCustomDrawer = (): JSX.Element => {
  return (
    <DrawerContentScrollView>
      <NotesDrawerProfile profilePictureStyle={styles.profilePictureView} />
      <NotesText
        notesText="Prasoon Gupta"
        notesTextStyle={styles.customDrawerTextStyle}
      />
      <NotesDivider />
      {CustomDrawerData.map(item => (
        <NotesDrawerItem
          key={item.id}
          drawerItemText={item.itemText}
          drawerItemPress={item.itemPress}
          notesDrawerItemImage={item.itemImage}
        />
      ))}
      <NotesDrawerItem
        drawerItemText={NotesString.Add_Category}
        drawerItemPress={() => {}}
        notesDrawerItemImage={require('../Assets/Images/NotesAddCategoryIcon.png')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profilePictureView: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginVertical: 5,
  },
  customDrawerTextStyle: {
    color: NotesColors.textDarkThemeColor,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
  },
});

export default NotesCustomDrawer;
