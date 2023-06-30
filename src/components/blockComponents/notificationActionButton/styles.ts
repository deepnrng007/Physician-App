import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  clearAll: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.green4,
    lineHeight: scale(14),
  },
  markAllRead: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.green4,
    marginLeft: scale(22),
    marginRight: scale(17),
    lineHeight: scale(14),
  },
});
