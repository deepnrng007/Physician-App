import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { getDeviceDimenstion } from "../../utils/utils";

const styles = ScaledSheet.create({
  faceidTouchIdIcon: {
    marginTop: scale(20),
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(45),
  },
  label: {
    width: getDeviceDimenstion("width") - 100,
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    fontWeight: "600",
  },
  description: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(22),
    marginTop: scale(43),
  },
});

export default styles;
