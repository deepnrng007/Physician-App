import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  titleName: {
    fontSize: scale(30),
    fontWeight: "700",
    color: themes.gray20,
    alignSelf: "center",
    marginBottom: scale(40),
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
  input: {
    marginTop: scale(20),
  },
  validation: {
    marginTop: scale(10),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  successLabel: {
    fontSize: scale(themes.NormalFontSize),
    color: themes.gray20,
    fontWeight: "600",
    marginLeft: scale(10),
  },
  direction: {
    fontSize: scale(16),
    color: themes.gray20,
    alignSelf: "center",
    marginTop: scale(50),
  },
  seconds: {
    fontSize: scale(16),
    color: themes.Black,
    fontFamily: themes.MontserratBoldFont,
  },
});

export default styles;
