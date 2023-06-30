import { themes } from "./../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
export const styles = StyleSheet.create({
  emptyView: {
    height: "100%",
    alignItems: "center",
  },
  text: {
    fontStyle: "normal",
    fontSize: scale(themes.NormalFontSize),
    lineHeight: scale(20),
    color: themes.Black,
    textAlign: "center",
    marginTop: scale(21),
  },
  icon: {
    marginTop: "40%",
    height: scale(94.46),
    width: scale(94.46),
  },
});
