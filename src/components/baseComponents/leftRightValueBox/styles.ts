import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  row: {
    flexDirection: "row",
  },
  col1: {
    flex: 35,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  col2: {
    flex: 65,
    marginLeft: scale(10),
  },
  heading: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.gray20,
  },
  value: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
  },
  statusValue: {
    padding: scale(5),
    alignSelf: "flex-start",
    borderRadius: scale(5),
  },
  onTrack: {
    backgroundColor: themes.successGreen,
  },
  offTrack: {
    backgroundColor: themes.Red,
  },
  tocStatus: {
    backgroundColor: themes.gray2,
  },
  statusLabel: {
    color: themes.White,
    fontFamily: themes.MontserratSemiBoldFont,
  },
});

export default styles;
