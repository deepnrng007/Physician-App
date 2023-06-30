import { KeyboardAvoidingView, ViewStyle } from "react-native";
import React from "react";
import { isAndroid } from "../../../utils/utils";
import { scale } from "react-native-size-matters";

type props = {
  children: any;
  style?: ViewStyle;
  verticalOffset?: number;
  isAndroid: boolean;
};

const AvoidKeyboardComponent = ({
  children,
  style,
  verticalOffset,
  isAndroid,
}: props) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={verticalOffset}
      behavior={isAndroid ? "padding" : undefined}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default AvoidKeyboardComponent;

AvoidKeyboardComponent.defaultProps = {
  verticalOffset: scale(100),
  isAndroid: !isAndroid(),
};
