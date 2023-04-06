type ItemData = {
  id: number;
  itemText: string;
  itemPress: Function;
  itemImage: number;
};
export const CustomDrawerData: ItemData[] = [
  {
    id: 1,
    itemText: 'Help',
    itemPress: () => {},
    itemImage: require('../Assets/Gif/NotesProfile.gif'),
  },
];
