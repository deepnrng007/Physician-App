import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";

export const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationValueText: {
    fontFamily: themes.MontserratSemiBoldFont,
    fontSize: scale(themes.NormalFontSize),
    flex: 0.25,
  },
  locationName: {
    fontFamily: themes.MontserratRegular,
    fontWeight: "500",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    color: themes.gray20,
    flex: 0.6,
  },
  locationDay: {
    fontFamily: themes.MontserratRegular,
    fontWeight: "500",
    fontSize: scale(themes.NormalFontSize),
    lineHeight: scale(17),
    color: themes.gray20,
    alignSelf: "flex-end",
  },
});
