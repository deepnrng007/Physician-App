import { themes } from "./../../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  checkboxLabel: {
    marginTop: scale(41),
    marginBottom: scale(32),
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  homeText: {
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontSize: scale(themes.LargeFontSize),
    fontWeight: "500",
    lineHeight: scale(17),
    color: themes.gray20,
  },
});
