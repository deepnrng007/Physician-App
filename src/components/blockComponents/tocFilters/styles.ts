import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: scale(themes.FontSize24),
    color: themes.gray20,
  },
  calenderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dash: {
    width: scale(5),
    height: scale(2),
    marginLeft: scale(5),
    marginRight: scale(5),
  },
  calenderTitle: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    marginBottom: scale(10),
  },
  dateRangeLabel: {
    marginTop: scale(30),
  },
  rangeDate: {
    width: "100%",
  },
  endDateContainer: {
    marginTop: scale(30),
    width: "60%",
  },
  badgeContainer: {
    flexDirection: "column",
  },
  locationContainer: {
    marginTop: scale(30),
  },
});

export default styles;
