import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";

export const styles = StyleSheet.create({
  contactNavigatorText: {
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.Black,
    marginTop: scale(24),
  },
  buttonText: {
    color: themes.gray20,
    fontSize: themes.NormalFontSize,
  },
  callButton: {
    flex: 0.48,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  messageButton: {
    flex: 0.48,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    backgroundColor: themes.green,
    borderRadius: scale(8),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    marginTop: scale(8),
  },
});
