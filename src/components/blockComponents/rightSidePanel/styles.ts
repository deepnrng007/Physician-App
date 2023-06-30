import { ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    width: "30%",
    backgroundColor: themes.transparent50,
    alignItems: "flex-end",
  },
  panelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: themes.White,
  },
});

export default styles;
