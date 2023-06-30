import { View, FlatList, ViewStyle } from "react-native";
import React from "react";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

type TransitionOfCareDaysProps = {
  list: any[];
  style?: ViewStyle;
};

const TransitionOfCareDays = ({ list, style }: TransitionOfCareDaysProps) => {
  const renderItems = ({ item }: any) => {
    const { label, value } = item;
    return (
      <View style={styles.box}>
        <AppText style={styles.label}>{label}</AppText>
        <AppText style={[styles.label, styles.bold]}>{value}</AppText>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        horizontal
        contentContainerStyle={styles.flatListStyle}
        data={list}
        renderItem={renderItems}
      />
    </View>
  );
};

export default TransitionOfCareDays;
