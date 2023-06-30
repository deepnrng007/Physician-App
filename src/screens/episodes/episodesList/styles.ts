import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    padding: 0,
  },
  titleWithFilter: {
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
    paddingBottom: scale(10),
  },
  approvedList: {
    ...(isAndroid()
      ? { paddingBottom: scale(180) }
      : { paddingBottom: scale(120) }),
  },
  horizontalLisStyle: {
    paddingLeft: 0,
    marginTop: scale(30),
  },
  filterContainer: {
    marginBottom: scale(20),
  },
  flex1: {
    flex: 1,
  },
  flex0: {
    flex: 0,
  },
  loaderView: {
    flex: 1,
    padding: 0,
    backgroundColor: themes.White,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCount: {
    paddingBottom: scale(15),
    paddingLeft: scale(16),
    paddingTop: scale(16),
    backgroundColor: themes.White,
  },
});

export default styles;
