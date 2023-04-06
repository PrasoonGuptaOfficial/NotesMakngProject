import React from 'react';
import {Alert, Pressable, StyleSheet, Text} from 'react-native';
import {NotesColors} from '../constants/Colors';
import {NotesIcons} from '../constants/Icon';

const NotesFloatingAction = (): JSX.Element => {
  return (
    <Pressable
      style={styles.floatingButton}
      onPress={() => {
        Alert.alert('Button is pressed');
      }}>
      <Text style={styles.floatingIconStyle}>{NotesIcons.plus}</Text>
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
