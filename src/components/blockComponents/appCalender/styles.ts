import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { getDeviceDimenstion } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.transparent50,
  },
  calenderStyle: {
    padding: scale(20),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    width: getDeviceDimenstion("width") - 50,
    borderRadius: scale(8),
    fontFamily: themes.MontserratSemiBoldFont,
  },
  datesStyle: {
    textAlign: "center",
  },
});

export default styles;
