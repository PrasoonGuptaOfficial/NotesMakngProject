import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NotesMainScreen from '../Screen/NotesMainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotesDrawerProfile from '../Components/NotesDrawerProfile';
import {NotesColors} from '../constants/Colors';
import {NotesString} from '../constants/NotesString';
import NotesCustomDrawer from './NotesCustomDrawer';
import {Platform, StyleSheet} from 'react-native';
import NotesDetailDisplayScreen from '../Screen/NotesDetailDisplayScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotesDisplayWishlistScreen from '../Screen/NotesDisplayWishlistScreen';
import {NotesIcons} from '../constants/Icon';
import NotesText from '../Components/NotesText';

const NotesStack = createStackNavigator();
const NotesDrawer = createDrawerNavigator();
const NotesTabs = createBottomTabNavigator();

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
      <NotesStack.Screen
        name="Detail"
        component={NotesDetailDisplayScreen}
        options={NotesStackOptions}
      />
    </NotesStack.Navigator>
  );
};

const NotesNavigationDrawer = (): JSX.Element => {
  return (
    <NotesDrawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props: any) => <NotesCustomDrawer {...props} />}
      screenOptions={({navigation}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <NotesDrawerProfile
            onPress={navigation.toggleDrawer}
            profilePictureStyle={styles.profilePictureView}
          />
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

const NotesNavigationBottomTabs = (): JSX.Element => {
  return (
    <NotesTabs.Navigator>
      <NotesTabs.Screen
        name={NotesString.Notes}
        component={NotesNavigationDrawer}
        options={{
          headerShown: false,
          tabBarLabel: NotesString.Notes,
          tabBarLabelStyle: {
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '500',
            color: NotesColors.textDarkThemeColor,
          },
          tabBarStyle: {
            backgroundColor: NotesColors.drawerHeaderThemeColor,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <NotesText
              notesText={NotesIcons.Notes}
              notesTextStyle={styles.tabIconTextStyle}
            />
          ),
        }}
      />
      <NotesTabs.Screen
        name={NotesString.Wishlist}
        component={NotesDisplayWishlistScreen}
        options={{
          headerTitle: NotesString.Wishlist,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: NotesColors.drawerHeaderThemeColor,
          },
          tabBarLabel: NotesString.Wishlist,
          tabBarLabelStyle: {
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '500',
            color: NotesColors.textDarkThemeColor,
          },
          tabBarStyle: {
            backgroundColor: NotesColors.drawerHeaderThemeColor,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) =>
            focused ? (
              <NotesText
                notesText={NotesIcons.WhishListSelected}
                notesTextStyle={styles.tabIconTextStyle}
              />
            ) : (
              <NotesText
                notesText={NotesIcons.WhishListUnselected}
                notesTextStyle={styles.tabIconTextStyle}
              />
            ),
        }}
      />
    </NotesTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  profilePictureView: {
    width: 27,
    height: 27,
    marginLeft: 3,
  },
  tabIconTextStyle: {
    fontSize: Platform.OS === 'ios' ? 25 : 22,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});

export default NotesNavigationBottomTabs;
