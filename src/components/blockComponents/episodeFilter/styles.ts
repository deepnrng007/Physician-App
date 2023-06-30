import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(themes.PaddingArroundValue),
    justifyContent: "space-between",
  },
  calenderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: scale(themes.FontSize22),
    color: themes.gray20,
  },
  locationContainer: {
    marginTop: scale(30),
  },
  button: {
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.green,
    borderRadius: scale(8),
  },
  buttonLabel: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
  },
  clearButton: {
    marginTop: scale(10),
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: themes.LightGreen2,
  },
  calender: {
    width: "43%",
  },
  calenderTitle: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    marginBottom: scale(10),
    color: themes.gray3,
  },
  dateRangeLabel: {
    marginTop: scale(30),
  },
  rangeDate: {
    width: "100%",
  },
  dash: {
    width: scale(5),
    height: scale(2),
    marginLeft: scale(5),
    marginRight: scale(5),
  },
  status: {
    marginTop: scale(30),
  },
});

export default styles;
