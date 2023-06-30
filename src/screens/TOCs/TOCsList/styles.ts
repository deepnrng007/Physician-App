import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";
const styles = ScaledSheet.create({
  container: {
    padding: 0,
  },
  titleCount: {
    paddingBottom: scale(15),
    paddingLeft: scale(16),
    paddingTop: scale(16),
    backgroundColor: themes.White,
  },
  titleWithFilter: {
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
    paddingBottom: scale(10),
  },
  horizontalLisStyle: {
    paddingLeft: 0,
    marginTop: scale(30),
  },
  filterContainer: {
    marginBottom: scale(20),
  },
  approvedTocs: {
    padding: scale(themes.PaddingArroundValue),
  },
  approvedBottom: {
    ...(isAndroid() && { paddingBottom: scale(70) }),
  },
});

export default styles;
