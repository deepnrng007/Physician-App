import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {},
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  badge: {
    borderWidth: 1,
    borderColor: themes.LightGreen2,
    alignSelf: "flex-start",
    padding: scale(8),
    borderRadius: scale(8),
    marginBottom: scale(10),
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
