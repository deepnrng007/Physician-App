import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
  },
  notfound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line1: {
    color: themes.Black,
    fontSize: scale(themes.NormalFontSize),
    lineHeight: scale(23),
    textAlign: "center",
  },
});

export default styles;
