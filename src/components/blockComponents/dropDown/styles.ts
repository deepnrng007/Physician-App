import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(50),
    flex: 0.6,
    backgroundColor: "white",
    borderRadius: scale(themes.borderRadius),
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.searchBoxBorder,
    marginRight: scale(16),
    justifyContent: "space-between",
  },

  placeHolder: {
    flex: 0.9,
    marginLeft: scale(12),
    fontFamily: themes.MontserratSemiBoldFont,
    fontSize: scale(themes.LargeFontSize),
    fontStyle: "normal",
    lineHeight: scale(17),
    color: themes.transparent40,
  },
  selectedText: {
    flex: 0.9,
    marginLeft: scale(12),
    fontFamily: themes.MontserratSemiBoldFont,
    fontSize: scale(themes.LargeFontSize),
    fontStyle: "normal",
    lineHeight: scale(17),
    color: themes.gray20,
  },
  icon: {
    marginRight: scale(8),
    backgroundColor: themes.White,
  },
});
