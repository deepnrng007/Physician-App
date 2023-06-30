import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  navigatorName: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
    paddingBottom: scale(3),
    fontFamily: themes.MontserratBoldFont,
  },
  problem: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black2,
    lineHeight: scale(20),
  },
  name: {
    fontSize: scale(themes.MediumFontSize),
    lineHeight: scale(15),
    color: themes.Black1,
  },
  date: {
    fontSize: scale(themes.MediumFontSize),
    color: themes.Black1,
  },
});

export default styles;
