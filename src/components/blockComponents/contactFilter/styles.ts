import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {},
  badgeContainer: {
    justifyContent: "space-between",
  },
  badge: {
    borderWidth: 1,
    borderColor: themes.LightGreen2,
    alignSelf: "flex-start",
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(24),
  },
  badegeLabel: {
    fontSize: scale(themes.LargeFontSize),
  },
  title: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    marginBottom: scale(10),
  },
});

export default styles;
