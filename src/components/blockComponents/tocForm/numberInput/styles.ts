import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";

export const styles = StyleSheet.create({
  texInput: {
    backgroundColor: themes.White,
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    padding: scale(8),
    lineHeight: scale(20),
    fontFamily: themes.MontserratSemiBoldFont,
    fontStyle: "normal",
    width: scale(48),
    height: scale(48),
    borderColor: themes.LightGreen2,
    borderWidth: scale(themes.borderWidthSize),
    borderRadius: scale(8),
  },
  input: {},
});
