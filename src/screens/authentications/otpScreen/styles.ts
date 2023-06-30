import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  titleName: {
    fontSize: scale(30),
    fontWeight: "700",
    color: themes.gray20,
    alignSelf: "center",
    marginTop: scale(70),
  },
  otpInput: {
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  backArrow: {
    ...(!isAndroid() ? { marginTop: scale(50) } : { marginTop: scale(10) }),
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 9,
    width: "100%",
  },
  otpInputContainer: {
    marginTop: scale(45),
  },
  enterOtp: {
    fontweight: "600",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    textAlign: "center",
    letterApacing: 0.8,
    color: themes.gray20,
  },
  timer: {
    fontFamily: themes.MontserratBoldFont,
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    letterApacing: 0.8,
    color: themes.gray20,
  },
  textStyle: {
    fontSize: scale(themes.LargeFontSize),
    fontWeight: "700",
    color: themes.green,
  },
});

export default styles;
