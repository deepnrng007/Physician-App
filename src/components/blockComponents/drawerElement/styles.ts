import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  drawerLabel: {
    color: themes.green,
    fontWeight: "bold",
    marginRight: scale(-20),
    fontSize: scale(themes.SmallFontSize),
    marginLeft: scale(16),
    letterSpacing: scale(1),
  },
  divider: {
    marginTop: scale(22.7),
    height: 1,
    width: "95%",
    marginLeft: scale(20),
    backgroundColor: themes.shadowGreen,
  },
  navigationMenuView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigationMenuInnerView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(16),
  },
  rightArrow: { marginRight: scale(20) },
});
