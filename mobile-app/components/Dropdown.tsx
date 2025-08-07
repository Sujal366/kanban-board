import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropdownComponentProps = {
  items: Array<{ label: string; value: string }>;
  value?: string;
  onChangeFunction: (item: { label: string; value: string }) => void;
  placeholder?: string;
};

const DropdownComponent = ({
  items,
  onChangeFunction,
  value,
  placeholder,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const date = new Date();

  return (
    <View style={styles.view}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.container}
        itemTextStyle={[
          styles.itemTextStyle,
        ]}
        activeColor="#e8e8e8ff"
        data={items}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? (placeholder ?? "Select...") : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          onChangeFunction(item);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
  },
  dropdown: {
    height: 40,
    width: 120,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  container:{
    // height: 200,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    // paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 16,
    // color will be set dynamically in the component
  },
});
