import { View } from "react-native";
import React from "react";
import { LeftRightVAlueBoxProps } from "./type";
import styles from "./styles";
import AppText from "../appText";

const LeftRightValueBox = ({
  leftValue,
  rightValue,
  style,
}: LeftRightVAlueBoxProps) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.col1}>
        <AppText style={styles.value}>{leftValue}</AppText>
      </View>
      <View style={styles.col2}>
        <View style={styles.statusValue}>
          <AppText style={styles.heading}>{rightValue}</AppText>
        </View>
      </View>
    </View>
  );
};

export default LeftRightValueBox;

LeftRightValueBox.defaultProps = {
  style: {},
};
