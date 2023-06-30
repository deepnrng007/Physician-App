import { themes } from "./../../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { getDeviceDimenstion } from "../../../../utils/utils";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.transparent80,
  },
  dialogView: {
    padding: scale(20),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    width: getDeviceDimenstion("width") - 50,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.White,
  },
  alertMessage: {
    fontFamily: themes.MontserratSemiBoldFont,
    fontStyle: "normal",
    fontSize: themes.FontSize24,
    lineHeight: scale(36),
    textAlign: "center",
    marginTop: scale(13),
    color: themes.gray20,
  },
  name: {
    fontFamily: themes.MontserratBoldFont,
    fontStyle: "normal",
    fontSize: themes.FontSize24,
    lineHeight: scale(36),
    textAlign: "center",
    color: themes.gray20,
  },
  cancelButton: {
    width: "90%",
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green3,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(24),
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
  },
  pendingText: {
    fontFamily: themes.MontserratSemiBoldFont,
    fontStyle: "normal",
    fontSize: themes.LargeFontSize,
    lineHeight: scale(17.07),
    letterSpacing: scale(0.78),
    marginTop: scale(24),
    marginBottom: scale(7),
    color: themes.Black,
  },

  cancelText: {
    color: themes.gray20,
    fontSize: themes.NormalFontSize,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  approveText: {
    color: themes.White,
    fontSize: themes.NormalFontSize,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  checkMarkStyle: {
    height: scale(83),
    width: scale(83),
  },
});
