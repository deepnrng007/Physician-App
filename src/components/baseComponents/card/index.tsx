import React from "react";
import styles from "./styles";
import { CardProps } from "./type";
import AppButton from "../appButton";
import { ViewStyle } from "react-native";

const Card = ({ onpress, style, children, testID }: CardProps) => {
  return (
    <AppButton
      testID={testID}
      onPress={onpress}
      style={[styles.container, style] as ViewStyle}
    >
      {children}
    </AppButton>
  );
};

export default Card;
