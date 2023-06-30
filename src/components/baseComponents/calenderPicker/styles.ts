import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    zIndex: 9,
  },
  calenderTitle: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.gray3,
  },
  calenderBox: {
    borderWidth: 1,
    borderColor: themes.LightGreen2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: scale(6),
    paddingLeft: scale(6),
    borderRadius: scale(4),
  },
  calenderContainer: {
    position: "absolute",
    zIndex: 99,
    top: scale(50),
  },
  calender: {
    backgroundColor: themes.Red,
    zIndex: 99,
  },
  textInput: {
    height: scale(35),
    fontSize: themes.LargeFontSize,
    color: themes.gray20,
  },
});

export default styles;
