import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  dotView: {
    height: scale(5),
    width: scale(5),
    borderRadius: scale(5),
    backgroundColor: themes.green,
  },
  notificationDot: {
    position: "absolute",
    right: 0,
    zIndex: 9,
    backgroundColor: themes.Red,
  },
});

export default styles;
