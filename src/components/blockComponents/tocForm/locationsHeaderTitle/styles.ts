import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";

export const styles = StyleSheet.create({
  locationText: {
    fontFamily: themes.MontserratBoldFont,
    color: themes.gray20,
    fontSize: scale(themes.LargeFontSize),
    textAlign: "left",
  },
});
