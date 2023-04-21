import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text} from 'react-native';
import {NotesColors} from '../constants/Colors';
import {NotesIcons} from '../constants/Icon';
import NotesAddModal from './NotesAddModal';

const NotesFloatingAction = (): JSX.Element => {
  const [isAddNotesModalOpen, setAddNotesModalOpen] = useState(false);
  const onAddNotesHandler = () => {
    setAddNotesModalOpen(true);
  };
  const onAddNotesModalCloseHandler = () => {
    setAddNotesModalOpen(false);
  };
  return (
    <Pressable style={styles.floatingButton} onPress={onAddNotesHandler}>
      <Text style={styles.floatingIconStyle}>{NotesIcons.plus}</Text>
      {isAddNotesModalOpen && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddNotesModalOpen}
          onRequestClose={onAddNotesModalCloseHandler}>
          <NotesAddModal onAddNotesModalClose={onAddNotesModalCloseHandler} />
        </Modal>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: NotesColors.floatingThemeColor,
    borderColor: NotesColors.floatingThemeColor,
    borderRadius: 200 / 2,
    opacity: 0.7,
  },
  floatingIconStyle: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    textAlign: 'center',
    color: NotesColors.whiteColor,
  },
});

export default NotesFloatingAction;
