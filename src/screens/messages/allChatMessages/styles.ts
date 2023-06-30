import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  paddingLeftRight: {
    paddingLeft: scale(16),
    paddingRight: scale(16),
  },
  box: {
    backgroundColor: "yellow",
  },
  search: {
    marginTop: scale(15),
    marginBottom: scale(20),
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: scale(15),
    paddingBottom: scale(15),
  },
  col1: {
    flex: 20,
  },
  col2: {
    flex: 80,
    marginLeft: scale(10),
  },
  name: {
    fontFamily: themes.MontserratBoldFont,
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    flex: 60,
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    marginTop: scale(5),
  },
  nameDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    flex: 34,
    fontSize: scale(themes.SmallFontSize),
    textAlign: "right",
    color: themes.gray20,
  },
  badge: {
    backgroundColor: themes.LightGreen4,
    alignSelf: "flex-start",
    padding: scale(3),
    paddingRight: scale(8),
    paddingLeft: scale(8),
    borderRadius: scale(10),
    marginTop: scale(5),
  },
  convesionType: {
    color: themes.gray2,
    fontSize: scale(themes.MediumFontSize),
  },
  resultFoundLabel: {
    textAlign: "center",
    paddingTop: scale(40),
  },
  notFoundView: {
    flex: 1,
    alignSelf: "center",
    marginTop: scale(60),
  },
});

export default styles;
