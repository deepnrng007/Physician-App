import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    padding: scale(28),
    ...(!isAndroid() && { paddingTop: scale(50) }),
  },
  loginTitle: {
    fontSize: scale(30),
    color: themes.gray20,
    fontWeight: "700",
  },
  logo: {
    width: scale(150),
  },
  titleView: {
    flexDirection: "row",
  },
  inputContainer: {
    marginTop: scale(60),
    justifyContent: "center",
  },
  input: {
    marginTop: scale(20),
  },
  forgotPassword: {
    color: themes.green,
    fontSize: scale(themes.LargeFontSize),
    alignSelf: "flex-end",
    marginTop: scale(10),
  },
  loginWithTouch: {
    color: themes.green,
    fontSize: scale(themes.NormalFontSize),
    alignSelf: "center",
    position: "absolute",
    bottom: scale(50),
  },
});

export default styles;
