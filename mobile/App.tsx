import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NotesStatusBar from './src/Components/NotesStatusBar';
import NotesNavigationDrawer from './src/Navigation/NotesNavigation';
import {Provider} from 'react-redux';
import {NotesStore} from './src/Redux/NotesStore';

const App = (): JSX.Element => {
  return (
    <>
      <Provider store={NotesStore}>
        <NotesStatusBar />
        {Platform.OS === 'ios' ? (
          <View style={styles.statusBarAlignment} />
        ) : null}
        <NavigationContainer>
          <NotesNavigationDrawer />
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarAlignment: {
    height: 18,
  },
});

export default App;
