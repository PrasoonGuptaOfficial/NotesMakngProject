import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NotesMainScreen from '../Screen/NotesMainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotesDrawerProfile from '../Components/NotesDrawerProfile';
import {NotesColors} from '../constants/Colors';
import {NotesString} from '../constants/NotesString';

const NotesStack = createStackNavigator();
const NotesDrawer = createDrawerNavigator();

const NotesStackOptions = {
  headerShown: false,
};

const NotesNavigationStack = (): JSX.Element => {
  return (
    <NotesStack.Navigator>
      <NotesStack.Screen
        name="Main"
        component={NotesMainScreen}
        options={NotesStackOptions}
      />
    </NotesStack.Navigator>
  );
};

const NotesNavigationDrawer = (): JSX.Element => {
  return (
    <NotesDrawer.Navigator
      screenOptions={({navigation}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <NotesDrawerProfile onPress={navigation.toggleDrawer} />
        ),
      })}>
      <NotesDrawer.Screen
        name="Home"
        component={NotesNavigationStack}
        options={{
          headerTitle: NotesString.Notes,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: NotesColors.drawerHeaderThemeColor,
          },
        }}
      />
    </NotesDrawer.Navigator>
  );
};

export default NotesNavigationDrawer;
