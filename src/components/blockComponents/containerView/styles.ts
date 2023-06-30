import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { getDeviceDimenstion } from "../../../utils/utils";

const styles = ScaledSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: themes.White,
  },
  container: {
    flexGrow: 1,
    padding: scale(themes.PaddingArroundValue),
  },
  loadingView: {
    width: "100%",
    height: getDeviceDimenstion("height") - scale(150),
  },
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  ovalStyle: {
    position: "absolute",
    bottom: scale(50),
  },
  navigationHeader: {
    padding: scale(16),
  },
});

export default styles;
