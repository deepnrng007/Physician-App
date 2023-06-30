import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  closeIcon: {
    marginTop: scale(40),
    marginLeft: scale(30),
  },
  uploadBtn: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    alignItems: "center",
  },
  sendLabel: {
    marginTop: scale(10),
    marginBottom: scale(10),
    fontSize: scale(themes.NormalFontSize),
    color: themes.green,
  },
});

export default styles;
