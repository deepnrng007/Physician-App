import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  centeredView: {
    flex: 1,
  },

  activityIndicatorWrapper: {
    backgroundColor: themes.Black,
    opacity: 0.8,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: themes.MontserratMediumFont,
    fontSize: scale(14),
    color: themes.White,
  },
});

export default styles;
