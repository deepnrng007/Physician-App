import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { getShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.White,
    padding: scale(8),
    ...getShadow(),
  },
  status: {
    position: "absolute",
    padding: scale(2),
    paddingRight: scale(15),
    paddingLeft: scale(15),
    top: scale(-4),
    right: scale(10),
    borderWidth: 1,
    borderColor: themes.Black1,
    borderRadius: scale(15),
    backgroundColor: themes.LightGray,
  },
  statusLabel: {
    color: themes.Black,
    fontSize: scale(themes.MediumFontSize),
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: scale(20),
  },
  date: {
    color: themes.Black,
    fontSize: scale(themes.MediumFontSize),
  },
  navName: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
  },
  name: {
    color: themes.Black,
    fontWeight: "bold",
    fontSize: scale(themes.MediumFontSize),
  },
  details: {
    marginTop: scale(10),
  },
});

export default styles;
