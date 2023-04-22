import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import type {NotesRootState} from '../Redux/NotesStore';
import NotesDisplayCard from '../Components/NotesDisplayCard';
import {NotesString} from '../constants/NotesString';

export interface FetchedNotesItem {
  id: number;
  notesTitle: string;
  notesDescription: string;
  notesSelectedCategory: string;
}

export interface FetchedNotesState {
  AddNotes: FetchedNotesItem[];
}

const NotesDisplayScreen = (): JSX.Element => {
  const FetchedNotes: FetchedNotesState = useSelector(
    (state: NotesRootState) => state.AddNotesSlice,
  );
  const FetchedSingleSelectedCategory: string = useSelector(
    (state: NotesRootState) => state?.AddCategoryReducer?.SelectSingleCategory,
  );
  const filteredNotesDisplay =
    FetchedSingleSelectedCategory === NotesString.All_Notes_Category
      ? FetchedNotes.AddNotes
      : FetchedNotes.AddNotes.filter(
          item => item.notesSelectedCategory === FetchedSingleSelectedCategory,
        );
  const onAddNotesRenderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.notesCardDisplayLayout}>
        <NotesDisplayCard
          notesCardTitle={item.notesTitle}
          notesCardDescription={item.notesDescription}
          notesCardSelectedCategory={item.notesSelectedCategory}
          notesCardIdDate={item.id}
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={filteredNotesDisplay}
        renderItem={onAddNotesRenderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
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

export default NotesDisplayScreen;
