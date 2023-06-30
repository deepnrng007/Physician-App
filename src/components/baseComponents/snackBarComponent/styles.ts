import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.RedTransparent20,
    flexDirection: "row",
    width: "100%",
    padding: scale(10),
    borderRadius: scale(8),
    alignItems: "center",
    alignSelf: "center",
  },
  errorLabel: {
    color: themes.White,
    fontSize: scale(themes.MediumFontSize),
    width: "90%",
    lineHeight: scale(18),
  },
  close: {
    width: "10%",
  },
});

export default styles;
