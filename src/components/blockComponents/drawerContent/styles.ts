import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { disableShadow } from "../../../utils/utils";

export const styles = StyleSheet.create({
  drawerContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  navigationHeaderView: {
    flex: 0.2,
    alignSelf: "flex-start",
    width: "90%",
    marginHorizontal: scale(18),
  },
  drawerElementView: {
    paddingTop: scale(22),
  },
  userInfoView: {
    backgroundColor: themes.LightGreen,
    borderWidth: scale(themes.borderWidthSize),
    marginTop: scale(30),
    marginHorizontal: scale(18),
    height: scale(76),
    borderColor: themes.shadowGreen,
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
    justifyContent: "center",
    borderColor: "black",
    height: scale(56),
  },
  loggedInText: {
    color: themes.gray20,
    fontSize: scale(themes.MediumFontSize),
  },
  userName: {
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    fontWeight: "bold",
  },
  signoutText: {
    color: "white",
    fontSize: scale(themes.MediumFontSize),
    fontWeight: "bold",
    padding: 20,
  },
  closeButton: {
    marginLeft: scale(10),
  },
});
