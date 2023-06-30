import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";
import { getDeviceDimenstion } from "../../../../utils/utils";

export const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    ...Platform.select({
      ios: {
        height: getDeviceDimenstion("height") > 750 ? "25%" : "30%",
      },
      android: {
        height: getDeviceDimenstion("height") > 750 ? "30%" : "35%",
      },
    }),
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetView: {
    flex: 1,
    widht: "100%",
    alignItems: "center",
    marginTop: scale(18),
    justifyContent: "flex-start",
  },
  alertText: {
    fontFamily: themes.MontserratSemiBoldFont,
    fontSize: themes.FontSize18,
    color: themes.gray20,
    textAlign: "center",
    marginVertical: scale(24),
    marginHorizontal: scale(18),
  },
  buttonText: {
    color: themes.gray20,
    fontSize: themes.NormalFontSize,
  },
  approveText: {
    color: themes.White,
    fontSize: themes.NormalFontSize,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  cancelButton: {
    flex: 0.45,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green3,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  approveButton: {
    flex: 0.45,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    backgroundColor: themes.green,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: scale(8),
  },
});
