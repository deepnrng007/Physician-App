import React from "react";
import { Pressable, ActivityIndicator, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import AppText from "../appText";
import { AppButtonProps } from "./types";

const AppButton = ({
  onPress,
  style,
  textStyle,
  text,
  children,
  adjustsFontSizeToFit,
  showLoader,
  onLongPress,
  onKeyDown,
  onKeyUp,
  isDisabled,
  disabledStyle,
  isUderLined,
  testID,
  ...otherProps
}: AppButtonProps) => {
  const onClickPress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  const onClickLongPress = () => {
    if (!isDisabled) {
      onLongPress();
    }
  };

  return (
    <Pressable
      accessibilityLabel={testID}
      testID={testID}
      onPressIn={onKeyDown}
      onPressOut={onKeyUp}
      disabled={isDisabled}
      style={[
        style as ViewStyle,
        isDisabled && [
          { backgroundColor: themes.disabledColor },
          disabledStyle,
        ],
      ]}
      onPress={onClickPress}
      onLongPress={onClickLongPress}
      {...otherProps}
    >
      {text && (
        <AppText
          style={[
            { color: themes.Black1 },
            textStyle,
            isUderLined && { textDecorationLine: "underline" },
            isDisabled && { color: themes.disabledTextColor },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          allowFontScaling={false}
        >
          {text}
        </AppText>
      )}
      {showLoader && (
        <ActivityIndicator
          animating={showLoader}
          color={themes.Black1 as string}
          size="small"
          style={{ marginLeft: scale(30) }}
        />
      )}
      {children}
    </Pressable>
  );
};

AppButton.defaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  style: {},
  textStyle: {},
  children: null,
  text: undefined,
  adjustsFontSizeToFit: true,
  showLoader: false,
  isDisabled: false,
  disabledStyle: {},
};

export default AppButton;
