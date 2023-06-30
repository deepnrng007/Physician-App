import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(30),
  },
  label: {
    fontSize: scale(themes.LargeFontSize),
    marginLeft: scale(8),
  },
});

export default styles;
