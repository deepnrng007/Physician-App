import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";

export const styles = StyleSheet.create({
  surgeryName: {
    flex: 0.8,
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.Black,
    fontSize: scale(themes.LargeFontSize),
  },
  acuteLoSLabel: {
    fontSize: scale(themes.LargeFontSize),
  },
  acuteLoSErrorLabel: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.ErrorRed,
    marginLeft: scale(6.5),
  },
  errorView: {
    flexDirection: "row",
    marginRight: scale(16),
    marginTop: scale(10),
    alignItems: "center",
  },
  surgeryNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: scale(8),
  },
  surgeryHospitalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(8),
  },
  locationDay: {
    fontFamily: themes.MontserratRegular,
    fontWeight: "500",
    fontSize: scale(themes.NormalFontSize),
    lineHeight: scale(17),
    color: themes.gray20,
  },
});
