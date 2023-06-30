import React from "react";
import { ViewStyle } from "react-native";

export type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  onpress?: any;
  testID?: string;
};
