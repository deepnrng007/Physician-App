import { ViewStyle } from "react-native";
import React from "react";
import AppText from "../appText";
import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

type AppTitleProps = {
  titleName: string;
  style?: ViewStyle;
};

const AppTitle = ({ titleName, style }: AppTitleProps) => {
  return <AppText style={[styles.titleName, style]}>{titleName}</AppText>;
};

export default AppTitle;

const styles = ScaledSheet.create({
  titleName: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.Black,
  },
});
