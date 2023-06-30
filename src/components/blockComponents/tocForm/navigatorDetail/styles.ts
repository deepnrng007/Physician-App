import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";

export const styles = StyleSheet.create({
  navigatorDetailView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(8),
  },
  navigatorAssignedText: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.Black,
    fontFamily: themes.MontserratBoldFont,
  },
  navigatorName: {
    color: themes.Black1,
    fontSize: scale(themes.LargeFontSize),
    marginLeft: scale(4),
  },
});
