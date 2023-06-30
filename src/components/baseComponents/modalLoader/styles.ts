import { ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.transparent80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
