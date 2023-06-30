import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  gradient: {
    padding: scale(1),
    borderRadius: scale(4),
    width: "70%",
  },
  navigation: {
    paddingLeft: scale(16),
    paddingRight: scale(16),
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: scale(themes.MediumFontSize),
  },
  underline: {
    flex: 1,
  },
  currentUSer: {
    backgroundColor: themes.messageBGColor,
  },
  bubble: {
    padding: scale(10),
    borderRadius: scale(4),
    backgroundColor: themes.White,
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(18),
  },
  dates: {
    marginTop: scale(6),
    fontSize: scale(themes.MediumFontSize),
  },
});

export default styles;
