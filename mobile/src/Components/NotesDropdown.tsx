import React, {ReactElement, useRef, useState, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {NotesIcons} from '../constants/Icon';
import {NotesColors} from '../constants/Colors';
import {NotesString} from '../constants/NotesString';

interface DropDownProps {
  label: string;
  data: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
}

const NotesDropdown: FC<DropDownProps> = ({label, data, onSelect}) => {
  const DropDownButton = useRef();
  const [onNotesDropdownVisible, setOnNotesDropdownVisible] = useState(false);
  const [onNotesDropdownValue, setOnNotesDropdownValue] = useState(0);
  const [onNotesSelectedItem, setOnNotesSelectedItem] = useState(undefined);
  const toggleDropDownButton = (): void => {
    onNotesDropdownVisible
      ? setOnNotesDropdownVisible(false)
      : openNotesDropdownHandler();
  };
  const openNotesDropdownHandler = (): void => {
    DropDownButton.current.measure(
      (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
        setOnNotesDropdownValue(py + h);
      },
    );
    setOnNotesDropdownVisible(true);
  };
  const onSingleItemPress = (item: React.SetStateAction<undefined>): void => {
    setOnNotesSelectedItem(item);
    onSelect(item);
    setOnNotesDropdownVisible(false);
  };
  const renderDropdownRenderItem = ({item}): ReactElement<any, any> => (
    <TouchableOpacity
      style={styles.renderItemStyle}
      onPress={() => {
        onSingleItemPress(item);
      }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  const renderDropDownSeparatorStyle = (): JSX.Element => {
    return <View style={styles.dropdownItemSeparatorStyle} />;
  };
  const renderDropDownData = (): ReactElement<any, any> => {
    return (
      <Modal
        visible={onNotesDropdownVisible}
        transparent={true}
        animationType="none">
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={() => {
            setOnNotesDropdownVisible(false);
          }}>
          <View style={[styles.dropDownStyle, {top: onNotesDropdownValue}]}>
            <FlatList
              data={data}
              renderItem={renderDropdownRenderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderDropDownSeparatorStyle}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      ref={DropDownButton}
      style={styles.dropDownButtonStyle}
      onPress={toggleDropDownButton}>
      {renderDropDownData()}
      {((onNotesSelectedItem && onNotesSelectedItem.label) || label) ===
      NotesString.Add_Notes_Category ? (
        <Text
          style={[
            styles.notesDropdownTextStyle,
            {color: NotesColors.placeHolderTextInputThemeColor},
          ]}>
          {(onNotesSelectedItem && onNotesSelectedItem.label) || label}
        </Text>
      ) : (
        <Text style={styles.notesDropdownTextStyle}>
          {(onNotesSelectedItem && onNotesSelectedItem.label) || label}
        </Text>
      )}
      {onNotesDropdownVisible === false ? (
        <Text style={styles.dropDownArrowStyle}>
          {NotesIcons.DropDownArrow}
        </Text>
      ) : (
        <Text style={styles.dropDownUpArrowStyle}>
          {NotesIcons.DropUpArrow}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropDownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NotesColors.mainLightThemeColor,
    height: 38,
    marginVertical: 5,
    marginHorizontal: 7,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: NotesColors.placeHolderTextInputThemeColor,
    zIndex: 1,
  },
  dropdownOverlay: {
    width: '100%',
    height: '100%',
  },
  dropDownStyle: {
    position: 'relative',
    backgroundColor: NotesColors.mainLightThemeColor,
    width: '78%',
    marginHorizontal: 40,
    marginTop: 3,
    borderRadius: 10,
    shadowColor: NotesColors.mainLightThemeColor,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  renderItemStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  dropDownArrowStyle: {
    marginRight: 10,
    fontSize: 18,
    marginBottom: 8,
    color: NotesColors.textDarkThemeColor,
  },
  dropDownUpArrowStyle: {
    marginRight: 9,
    fontSize: 15,
    marginTop: 8,
    color: NotesColors.textDarkThemeColor,
  },
  notesDropdownTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: NotesColors.textDarkThemeColor,
  },
  dropdownItemSeparatorStyle: {
    backgroundColor: NotesColors.placeHolderTextInputThemeColor,
    height: 0.5,
  },
});

export default NotesDropdown;
