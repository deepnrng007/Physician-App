import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  icon: {
    color: themes.White,
    fontSize: scale(20),
  },
  title: {
    paddingLeft: scale(10),
    fontSize: scale(themes.ExtraLargeFontSize),
    fontFamily: themes.MontserratMediumFont,
    color: themes.DarkGray,
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterView: {
    backgroundColor: themes.LightGray2,
    borderRadius: scale(4.5),
    padding: scale(5),
    paddingLeft: scale(8),
    paddingRight: scale(8),
    marginLeft: scale(8),
  },
  counter: {
    fontSize: scale(14),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.DarkGray,
  },
});

export default styles;
