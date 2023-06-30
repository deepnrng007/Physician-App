import { ViewStyle, View } from "react-native";
import React from "react";
import styles from "./styles";
import { BoxViewProps } from "./type";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";

const BoxView = ({
  viewStyle,
  topTextStyle,
  bottomTextStyle,
  topText,
  bottomText,
  onPress,
  iconTag,
}: BoxViewProps) => {
  return (
    <AppButton style={styles.buttonContainer as ViewStyle} onPress={onPress}>
      <View style={[styles.container, { viewStyle }] as ViewStyle}>
        <AppText style={(styles.label, topTextStyle)}>{topText}</AppText>
        {bottomText && (
          <AppText style={(styles.label, bottomTextStyle)}>
            {bottomText}
          </AppText>
        )}
      </View>
      {iconTag}
    </AppButton>
  );
};

export default BoxView;
