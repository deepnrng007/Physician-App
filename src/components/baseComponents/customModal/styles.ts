import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.transparent80,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: themes.White,
    padding: scale(15),
    width: "85%",
    borderRadius: scale(8),
  },
  bottomStyle: {
    justifyContent: "flex-end",
  },
  bottomBox: {
    width: "100%",
  },
});

export default styles;
