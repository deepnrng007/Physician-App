import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { getDeviceDimenstion } from "../../../utils/utils";

const styles = ScaledSheet.create({
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  safeContainer: {
    margin: scale(themes.PaddingArroundValue),
    marginRight: 0,
  },
  titleContainer: {
    paddingLeft: scale(themes.PaddingArroundValue),
  },
  title: {
    paddingLeft: scale(10),
    fontSize: scale(themes.ExtraLargeFontSize),
    fontFamily: themes.MontserratMediumFont,
    color: themes.Black2,
  },
  card: {
    width: getDeviceDimenstion("width") - scale(80),
    margin: scale(themes.PaddingArroundValue),
    marginRight: 0,
    backgroundColor: themes.LightGreen,
    borderWidth: scale(0.5),
    borderColor: themes.green,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: scale(8),
    paddingBottom: scale(20),
    paddingTop: scale(20),
    paddingLeft: scale(16),
    paddingRight: scale(16),
  },
  detailsContainer: {
    marginRight: scale(15),
    width: "75%",
  },
  iconContainer: {
    backgroundColor: themes.green,
    borderRadius: scale(43),
    width: scale(43),
    height: scale(43),
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black2,
  },
  navigatorName: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
    paddingBottom: scale(3),
    fontFamily: themes.MontserratBoldFont,
  },
  problem: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratMediumFont,
    lineHeight: scale(25),
    color: themes.Black1,
  },
  date: {
    fontSize: scale(themes.MediumFontSize),
    fontFamily: themes.MontserratMediumFont,
    color: themes.Black1,
  },
  icon: {
    color: themes.White,
    fontSize: scale(20),
  },
  titleIcon: {
    marginLeft: scale(themes.PaddingArroundValue),
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
