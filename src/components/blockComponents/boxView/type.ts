import React from "react";
import { TextStyle, ViewStyle } from "react-native";

export type BoxViewProps = {
  viewStyle?: ViewStyle;
  topTextStyle?: TextStyle;
  bottomTextStyle?: TextStyle;
  topText: string;
  bottomText?: string;
  onPress?: any;
  iconTag?: React.ReactNode;
};
