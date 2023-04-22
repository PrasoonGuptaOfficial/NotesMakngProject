import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NotesColors} from '../constants/Colors';

const NotesDivider = (props: any): JSX.Element => {
  return (
    <View style={[styles.dividerLine, props.notesEnhancedDividerLineStyle]} />
  );
};

const styles = StyleSheet.create({
  dividerLine: {
    borderBottomColor: NotesColors.dividerLineThemeColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default NotesDivider;
