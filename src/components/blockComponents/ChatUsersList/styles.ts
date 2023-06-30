import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  chatUserNames: {
    fontWeight: "bold",
    fontSize: scale(themes.LargeFontSize),
  },
  patientDate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(3),
  },
  dateContainer: {
    flexDirection: "row",
  },
  label: {
    fontSize: scale(themes.MediumFontSize),
  },
  message: {
    color: themes.Black,
    fontSize: scale(themes.MediumFontSize),
    marginTop: scale(themes.SmallFontSize),
  },
});

export default styles;
