import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: scale(20),
    textAlign: "center",
    color: themes.gray20,
  },
  bioDesc: {
    fontSize: scale(themes.LargeFontSize),
    marginTop: scale(15),
    lineHeight: scale(22),
  },
  enableButton: {
    marginTop: scale(20),
    backgroundColor: themes.green,
    height: scale(50),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
  },
  skipButton: {
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: themes.green3,
  },
});

export default styles;
