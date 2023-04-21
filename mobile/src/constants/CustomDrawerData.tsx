type ItemData = {
  id: number;
  itemText: string;
  itemImage: {uri: string} | number;
};
export const CustomDrawerData: ItemData[] = [
  {
    id: 1,
    itemText: 'Help Me Prasoon',
    itemImage: require('../Assets/Gif/NotesProfile.gif'),
  },
];
