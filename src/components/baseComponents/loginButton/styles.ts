import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  loginLabel: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
    marginLeft: scale(8),
  },
  loginBtn: {
    height: scale(60),
    flexDirection: "row",
    backgroundColor: themes.greenOpacity60,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(60),
    opacity: 0.5,
  },
});

export default styles;
