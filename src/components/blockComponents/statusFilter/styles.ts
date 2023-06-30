import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    padding: scale(themes.PaddingArroundValue),
  },
  title: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray3,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  checkboxLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    backgroundColor: "red",
  },
  statusLabel: {
    fontSize: scale(themes.LargeFontSize),
  },
});

export default styles;
