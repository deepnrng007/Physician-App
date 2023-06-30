import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";

export const styles = StyleSheet.create({
  slideButtonView: {
    flexDirection: "row",
    height: scale(67),
    backgroundColor: themes.green,
    justifyContent: "center",
    alignItems: "center",
  },
  slideButtonText: {
    color: themes.White,
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratRegular,
    fontWeight: "bold",
    fontStyle: "normal",
    marginRight: scale(3),
    lineHeight: scale(17),
  },
});
