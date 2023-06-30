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
  title: {
    fontFamily: themes.MontserratRegular,
    fontSize: scale(themes.NormalFontSize),
    fontWeight: "700",
    lineHeight: scale(20),
    color: themes.gray20,
    marginTop: scale(30),
  },
  message: {
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontSize: themes.LargeFontSize,
    fontWeight: "500",
    lineHeight: scale(17),
    textAlign: "center",
    color: themes.gray20,
    marginTop: scale(16),
    marginBottom: scale(41),
  },

  dialogView: {
    paddingLeft: scale(16),
    paddingRight: scale(16),
    width: getDeviceDimenstion("width") - 50,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.White,
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
