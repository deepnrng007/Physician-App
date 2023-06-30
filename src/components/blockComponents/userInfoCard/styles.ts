import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { disableShadow } from "../../../utils/utils";

export const styles = StyleSheet.create({
  userInfoView: {
    backgroundColor: themes.LightGreen,
    borderWidth: scale(themes.borderWidthSize),
    marginTop: scale(30),
    height: scale(76),
    borderColor: themes.shadowGreen,
    borderRadius: scale(8),
    ...disableShadow(),
  },
  userDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutView: {
    backgroundColor: themes.green,
    borderRadius: 9,
    //justifyContent: "center",
  },
  loader: {
    width: scale(100),
    height: scale(55),
  },
  loggedInText: {
    color: themes.gray20,
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratRegular,
  },
  userName: {
    width: scale(155),
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    fontFamily: themes.MontserratBoldFont,
    marginTop: scale(8),
  },
  signoutText: {
    color: "white",
    fontSize: scale(themes.MediumFontSize),
    fontFamily: themes.MontserratBoldFont,
    padding: scale(20),
  },
});
