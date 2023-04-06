import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {NotesColors} from '../constants/Colors';

const NotesSafeAreaView = (props: any): JSX.Element => {
  const themeColor = useColorScheme();
  return (
    <SafeAreaView
      style={[
        styles.mainScreen,
        {
          backgroundColor:
            themeColor === 'dark'
              ? NotesColors.mainDarkThemeColor
              : NotesColors.mainLightThemeColor,
        },
      ]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
});

export default NotesSafeAreaView;
