import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import AppButton from "../appButton";
import AppText from "../appText";
import { ArrowDownIcon } from "../../../utils/imagePaths";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import Underline from "../underline";

type props = {
  onSelect: any;
  styleContainer?: ViewStyle;
  listStyle?: ViewStyle;
};

const contryCodes = ["+1"];

const CountryCodeSelector = ({
  onSelect,
  styleContainer,
  listStyle,
}: props) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(contryCodes[0]);

  const openMenu = () => setVisible(!visible);

  useEffect(() => onSelect(selectedItem), []);

  const onSelectItem = (item: string) => {
    setVisible(false);
    onSelect(item);
    setSelectedItem(item);
  };

  const renderItems = ({ item }: any) => {
    return (
      <AppButton
        onPress={() => onSelectItem(item)}
        style={[styles.item, listStyle] as ViewStyle}
      >
        <AppText style={styles.itemLabel}>{item}</AppText>
      </AppButton>
    );
  };

  return (
    <View>
      <View>
        <AppButton
          onPress={openMenu}
          style={[styles.countryCode, styleContainer] as ViewStyle}
        >
          <AppText style={styles.codeLabel}>{selectedItem}</AppText>
          <ArrowDownIcon />
        </AppButton>
      </View>
      {visible && (
        <View style={styles.flatListContainer}>
          <FlatList
            bounces={false}
            contentContainerStyle={{ borderRadius: 10 }}
            ItemSeparatorComponent={() => <Underline />}
            data={contryCodes}
            renderItem={renderItems}
          />
        </View>
      )}
    </View>
  );
};

export default CountryCodeSelector;
