import { themes } from "./../../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  contactHeaderText: {
    color: themes.DarkGray,
    fontSize: themes.ExtraLargeFontSize,
    marginBottom: scale(7),
  },
});
