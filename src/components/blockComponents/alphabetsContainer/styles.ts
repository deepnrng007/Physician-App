import { scale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { themes } from "../../../enums";

const styles = (props: boolean) =>
  StyleSheet.create({
    textStyle: {
      fontSize: scale(themes.LargeFontSize),
      color: props ? themes.green : themes.lightGray4,
      textAlign: "left",
      paddingVertical: scale(2),
      fontWeight: props ? "bold" : "normal",
    },
  });

export default styles;
