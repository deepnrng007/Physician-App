import { getDeviceDimenstion, isAndroid } from "./../../../utils/utils";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.transparent80,
  },
  notesText: {
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontSize: themes.LargeFontSize,
    fontWeight: "500",
    lineHeight: scale(17),
    textAlign: "left",
    color: themes.gray20,
  },
  date: {
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontSize: themes.MediumFontSize,
    lineHeight: scale(15),
    textAlign: "left",
    color: themes.transparent60,
    marginTop: scale(30),
  },
  contentStyle: {
    backgroundColor: "white",
    maxHeight: scale(136),
    minHeight: scale(20),
    marginTop: scale(12),
    marginBottom: scale(24),
  },
  dialogView: {
    paddingLeft: scale(15),
    paddingRight: scale(15),
    width: getDeviceDimenstion("width") - 50,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.White,
  },
  alertMessage: {
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontSize: themes.NormalFontSize,
    lineHeight: scale(17),
    textAlign: "center",
    marginTop: scale(32),
    color: themes.Black,
    fontWeight: "700",
  },
  dateView: {
    justifyContent: "flex-start",
    width: "100%",
  },
  approveButton: {
    width: "90%",
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    backgroundColor: themes.green,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(16),
  },
  approveText: {
    color: themes.White,
    fontSize: themes.NormalFontSize,
    fontFamily: themes.MontserratSemiBoldFont,
  },
});
