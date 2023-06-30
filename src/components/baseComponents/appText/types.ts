import React from "react";
import { ViewStyle } from "react-native";

export type AppTextProps = {
  style: any;
  children: string | React.ReactNode;
  adjustsFontSizeToFit: boolean;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  otherProps?: any;
  searchKeywords?: string[];
  highlightStyle?: any;
  testID?: string;
  highlightUrl?: boolean;
  linkStyle?: ViewStyle;
  onPress?: any;
};
