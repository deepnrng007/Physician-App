import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import { getDeviceDimenstion } from "../../../utils/utils";

export const styles = StyleSheet.create({
  name: {
    color: themes.gray20,
    fontSize: scale(themes.FontSize22),
    fontFamily: themes.MontserratSemiBoldFont,
  },
  contactType: {
    color: themes.Black1,
    fontSize: scale(themes.LargeFontSize),
    marginTop: scale(4),
    fontFamily: themes.MontserratRegular,
  },
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    ...Platform.select({
      ios: {
        height: getDeviceDimenstion("height") > 750 ? "35%" : "40%",
      },
      android: {
        height: getDeviceDimenstion("height") > 750 ? "40%" : "45%",
      },
    }),
  },
  wrapper: {
    backgroundColor: themes.transparent50,
  },
  bottomSheetView: {
    flex: 1,
    widht: "100%",
    alignItems: "center",
    marginTop: scale(18),
    justifyContent: "space-between",
  },
  textView: {
    alignItems: "center",
    width: "100%",
    marginBottom: scale(30),
  },
  buttonsView: {
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: scale(30),
  },
  messageButtonText: {
    color: "white",
    fontSize: scale(themes.NormalFontSize),
    paddingVertical: scale(16),
    marginLeft: scale(2),
  },
  messageButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.green,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    borderRadius: scale(8),
    marginHorizontal: scale(18),
    width: "90%",
  },
  callText: {
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    paddingVertical: scale(16),
    marginLeft: scale(2),
  },
  callButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: scale(themes.borderWidthSize),
    borderRadius: scale(8),
    borderColor: themes.green2,
    marginTop: scale(18),
    width: "90%",
  },
});
