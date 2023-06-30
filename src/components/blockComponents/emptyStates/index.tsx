import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../../baseComponents/appText";

type EmptyStatesProps = {
  Icon?: any;
  title?: string;
  message?: string;
  style?: ViewStyle;
};
const EmptyStates = ({ Icon, title, message, style }: EmptyStatesProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.box1}>
        <View style={styles.round}>
          <Icon />
        </View>
      </View>
      <View style={styles.box2}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.message}>{message}</AppText>
      </View>
    </View>
  );
};

export default EmptyStates;
