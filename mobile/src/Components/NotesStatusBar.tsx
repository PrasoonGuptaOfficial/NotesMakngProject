import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {NotesColors} from '../constants/Colors';

const NotesStatusBar = (): JSX.Element => {
  const statusBarTheme = useColorScheme();
  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={
            statusBarTheme === 'dark'
              ? NotesColors.parrotDarkThemeColor
              : NotesColors.parrotLightThemeColor
          }
        />
      )}
      {Platform.OS === 'ios' && (
        <View
          style={[
            styles.appBarIOSStyle,
            {
              backgroundColor:
                statusBarTheme === 'dark'
                  ? NotesColors.parrotDarkThemeColor
                  : NotesColors.parrotLightThemeColor,
            },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  appBarIOSStyle: {
    width: '100%',
    height: 22,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default NotesStatusBar;
