import { Linking, Text, ViewStyle } from "react-native";
import React from "react";
import { AppTextProps } from "./types";
import styles from "./styles";
import HighlightText from "@sanar/react-native-highlight-text";
import { themes } from "../../../enums";
import Hyperlink from "react-native-hyperlink";

const AppText = ({
  style,
  children,
  adjustsFontSizeToFit,
  numberOfLines,
  allowFontScaling,
  searchKeywords,
  highlightStyle,
  testID,
  highlightUrl,
  linkStyle,
  onPress,
  ...otherProps
}: AppTextProps) => {
  const renderText = () => {
    if (searchKeywords)
      return (
        <HighlightText
          onPress={onPress}
          accessibilityLabel={testID}
          testID={testID}
          style={[styles.defaultStyle, style] as ViewStyle}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          allowFontScaling={allowFontScaling}
          highlightStyle={
            [
              { color: themes.green, fontWeight: "bold" },
              highlightStyle,
            ] as ViewStyle
          }
          {...otherProps}
          searchWords={searchKeywords}
          textToHighlight={children}
        />
      );
    else if (highlightUrl)
      return (
        <Hyperlink
          onPress={(text) => Linking.openURL(text)}
          linkStyle={[styles.linkStyle, linkStyle]}
        >
          <Text
            onPress={onPress}
            accessibilityLabel={testID}
            testID={testID}
            style={[styles.defaultStyle, linkStyle]}
          >
            {children}
          </Text>
        </Hyperlink>
      );
    else
      return (
        <Text
          onPress={onPress}
          accessibilityLabel={testID}
          testID={testID}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          allowFontScaling={allowFontScaling}
          style={[styles.defaultStyle, style]}
          {...otherProps}
        >
          {children}
        </Text>
      );
  };
  return renderText();
};

export default AppText;

AppText.defaultProps = {
  adjustsFontSizeToFit: false,
  allowFontScaling: false,
  style: {},
};
