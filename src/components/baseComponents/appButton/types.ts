import React from "react";
import { TextStyle, ViewStyle } from "react-native";

export type AppButtonProps = {
  onPress: any;
  style: ViewStyle;
  textStyle: TextStyle;
  text: string;
  children: React.ReactNode;
  adjustsFontSizeToFit: boolean;
  showLoader: boolean;
  onLongPress: any;
  isDisabled: boolean;
  disabledStyle: object;
  otherProps?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  isUderLined?: boolean;
  testID?: string;
};
