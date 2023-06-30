import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  patientDetails: {
    marginTop: scale(24),
  },
  underline: {
    marginTop: scale(24),
    marginBottom: scale(15),
  },
  titleName: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.Black,
  },
  locationDesc: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratRegular,
    marginTop: scale(10),
    color: themes.Black,
  },
  underline1: {
    marginTop: scale(15),
    marginBottom: scale(15),
  },
  viewTocForm: {
    alignSelf: "center",
    marginBottom: scale(20),
  },
  tocLabel: {
    color: themes.green4,
    textDecorationLine: "underline",
    fontSize: scale(themes.MediumFontSize),
  },
  reviewApprove: {
    backgroundColor: themes.green,
    height: scale(45),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(25),
  },
  reviewLabel: {
    fontSize: scale(16),
    color: themes.White,
  },
  loader: {
    height: "100%",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
