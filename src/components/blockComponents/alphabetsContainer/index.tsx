import { View, FlatList } from "react-native";
import React, { useState } from "react";
import { AppButton, AppText } from "../..";
import styles from "./styles";
import { props } from "./types";

const AlphabetsContainer = (props: props) => {
  const { onAlphabetClick, alphaArray } = props;
  const [selectedButton, setSelectButton] = useState("A");

  const onselectAlphabet = (selectedAlphabet: string) => {
    setSelectButton(selectedAlphabet);
    onAlphabetClick(selectedAlphabet);
  };

  const renderItem = (item: any) => {
    return (
      <View>
        <AppButton onPress={() => onselectAlphabet(item.item)}>
          <AppText style={styles(selectedButton === item.item).textStyle}>
            {item.item}
          </AppText>
        </AppButton>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={alphaArray}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={(item) => renderItem(item)}
        initialNumToRender={26}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AlphabetsContainer;
