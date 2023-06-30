import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums";

export const styles = StyleSheet.create({
  changeLocation: {
    flex: 0.4,
    marginTop: scale(24),
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  changeLocationText: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.green4,
    textDecorationLine: "underline",
  },
});
