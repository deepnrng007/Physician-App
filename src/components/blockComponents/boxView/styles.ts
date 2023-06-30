import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(1),
    alignSelf: "flex-start",
    padding: scale(10),
  },
  container: {
    alignItems: "center",
  },
  label: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
  },
});

export default styles;
