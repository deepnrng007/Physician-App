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
  errorView: {
    flexDirection: "row",
    marginRight: scale(16),
    marginTop: scale(10),
    alignItems: "center",
  },
  errorLabel: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.ErrorRed,
    marginLeft: scale(6.5),
  },
});
