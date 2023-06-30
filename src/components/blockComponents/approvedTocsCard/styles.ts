import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  nagivatorDate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigatorName: {
    flex: 70,
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
    paddingBottom: scale(13),
    fontFamily: themes.MontserratBoldFont,
  },
  statusBadge: {
    backgroundColor: themes.LightGreen4,
    justifyContent: "center",
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderRadius: scale(20) / 2,
    height: scale(20),
  },
  name: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black2,
  },
  problem: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(25),
    color: themes.gray20,
  },
  date: {
    //flex: 30,
    fontSize: scale(themes.MediumFontSize),
    color: themes.Black1,
    textAlign: "right",
  },
  details: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.Black1,
    lineHeight: scale(25),
  },
});

export default styles;
