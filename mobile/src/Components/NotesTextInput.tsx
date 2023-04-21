import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {NotesColors} from '../constants/Colors';

const NotesTextInput = (props: any) => {
  return (
    <View>
      <TextInput
        value={props.categoryText}
        placeholder={props.placeHolderText}
        style={styles.modalViewContentTextInputStyle}
        placeholderTextColor={NotesColors.placeHolderTextInputThemeColor}
        onChangeText={props.categoryOnChangeText}
        keyboardType="ascii-capable"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalViewContentTextInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: NotesColors.placeHolderTextInputThemeColor,
    height: 35,
    marginVertical: 5,
    marginHorizontal: 10,
    color: NotesColors.textDarkThemeColor,
    paddingHorizontal: 5,
  },
});

export default NotesTextInput;
