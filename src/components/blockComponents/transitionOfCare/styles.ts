import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  title: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.Black,
    fontFamily: themes.MontserratBoldFont,
    textAlign: "center",
  },
  daysStyle: {
    marginTop: scale(20),
    marginBottom: scale(20),
  },
  label: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratRegular,
    color: themes.Black,
  },
  bold: {
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black,
    marginBottom: scale(5),
  },
  NoteContainer: {
    flexDirection: "row",
    marginTop: scale(15),
  },
});

export default styles;
