import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: themes.Red,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(1.5),
  },
  message: {
    color: themes.White,
    fontSize: scale(themes.MediumFontSize),
  },
});

export default styles;
