import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { isAndroid } from "../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    padding: 0,
    paddingTop: scale(16),
    ...(isAndroid() && { paddingBottom: scale(70) }),
  },
  paddingAround: {
    padding: scale(themes.PaddingArroundValue),
  },
  box: {
    backgroundColor: "yellow",
  },
  horizontalLisStyle: {
    marginTop: scale(27),
  },
  loaderView: {
    flex: 1,
    padding: 0,
    backgroundColor: themes.White,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
