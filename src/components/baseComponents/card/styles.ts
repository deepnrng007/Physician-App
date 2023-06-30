import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { getShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: themes.White,
    padding: scale(10),
    ...getShadow(),
  },
});

export default styles;
