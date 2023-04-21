import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import NotesDrawerProfile from '../Components/NotesDrawerProfile';
import NotesDivider from '../Components/NotesDivider';
import NotesText from '../Components/NotesText';
import {NotesColors} from '../constants/Colors';
import NotesDrawerItem from '../Components/NotesDrawerItem';
import {NotesString} from '../constants/NotesString';
import NotesAddCategoryModal from '../Components/NotesAddCategoryModal';
import {useSelector} from 'react-redux';
import {NotesRootState} from '../Redux/NotesStore';
import NotesSafeAreaView from '../Components/NotesSafeAreaView';

const NotesCustomDrawer = (): JSX.Element => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const AddCategoryDrawerItems = useSelector(
    (state: NotesRootState) => state.AddCategoryReducer.AddCategoryDrawer,
  );
  const onAddCategoryHandler = () => {
    setIsAddCategoryModalOpen(true);
  };
  const onAddCategoryModalCloseHandler = () => {
    setIsAddCategoryModalOpen(false);
  };
  const onIndividualDrawerItemPressHandler = (drawerText: string) => {
    console.log('Individual Item Id', drawerText);
  };
  return (
    <DrawerContentScrollView>
      <NotesSafeAreaView>
        <NotesDrawerProfile profilePictureStyle={styles.profilePictureView} />
        <NotesText
          notesText="Prasoon Gupta"
          notesTextStyle={styles.customDrawerTextStyle}
        />
        <NotesDivider />
        {AddCategoryDrawerItems.map(item => (
          <NotesDrawerItem
            key={item.id}
            drawerItemText={item.itemText}
            drawerItemPress={() => {
              onIndividualDrawerItemPressHandler(item.itemText);
            }}
            notesDrawerItemImage={item.itemImage}
          />
        ))}
        <NotesDrawerItem
          drawerItemText={NotesString.Add_Category}
          drawerItemPress={onAddCategoryHandler}
          notesDrawerItemImage={require('../Assets/Images/NotesAddCategoryIcon.png')}
        />
        {isAddCategoryModalOpen && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isAddCategoryModalOpen}
            onRequestClose={onAddCategoryModalCloseHandler}>
            <NotesAddCategoryModal
              onAddCategoryModalClose={onAddCategoryModalCloseHandler}
            />
          </Modal>
        )}
      </NotesSafeAreaView>
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
