import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  underline: {
    height: scale(0.5),
    backgroundColor: themes.underlinBordeColor,
  },
});

export default styles;
