import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {NotesRootState} from '../Redux/NotesStore';
import NotesDisplayCard from '../Components/NotesDisplayCard';
import {useIsFocused} from '@react-navigation/native';
import NotesSafeAreaView from '../Components/NotesSafeAreaView';

export interface FetchedNotesWishListItem {
  whishListId: number;
  notesWhishListTitle: string;
  notesWhishListDescription: string;
  notesWhishListSelectedCategory: string;
}

export interface FetchedNotesWishListState {
  AddWhishListNotes: FetchedNotesWishListItem[];
}

const NotesDisplayWishlistScreen = () => {
  const isWishListTabBarFocussed = useIsFocused();
  const FetchedWishListNotes: FetchedNotesWishListState = useSelector(
    (state: NotesRootState) => state.AddNotesWhishListSlice,
  );
  const onFetchedWishlistNotesRenderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.notesCardDisplayLayout}>
        <NotesDisplayCard
          notesCardTitle={item.notesWhishListTitle}
          notesCardDescription={item.notesWhishListDescription}
          notesCardSelectedCategory={item.notesWhishListSelectedCategory}
          notesCardIdDate={item.whishListId}
          notesBottomTabBarFocussed={isWishListTabBarFocussed}
        />
      </View>
    );
  };
  return (
    <NotesSafeAreaView>
      <FlatList
        data={FetchedWishListNotes.AddWhishListNotes}
        renderItem={onFetchedWishlistNotesRenderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </NotesSafeAreaView>
  );
};

const styles = StyleSheet.create({
  notesCardDisplayLayout: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default NotesDisplayWishlistScreen;
