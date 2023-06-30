import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import { themes } from "../../../enums";

type DotSylesProps = {
  style?: ViewStyle;
  isNotificationDot: boolean;
};

const DotSymbol = ({ style, isNotificationDot }: DotSylesProps) => {
  return (
    <View
      style={[
        styles.dotView,
        isNotificationDot
          ? styles.notificationDot
          : { backgroundColor: themes.transparent },
        style,
      ]}
    />
  );
};

export default DotSymbol;

DotSymbol.defaultProps = {
  style: {},
  isNotificationDot: false,
};
