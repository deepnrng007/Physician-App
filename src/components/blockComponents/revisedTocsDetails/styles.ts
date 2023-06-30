import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  reviseContainer: {
    flexDirection: "row",
  },
  ProgressSteps: {
    height: "70%",
    width: 2,
    backgroundColor: themes.gray1,
    alignSelf: "center",
  },
  revisedCard: {
    flex: 90,
    backgroundColor: themes.LightGreen1,
    padding: scale(7),
    borderRadius: scale(4),
    marginTop: scale(10),
  },
  titleDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(5),
  },
  reviseTitle: {
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black,
    fontSize: scale(themes.LargeFontSize),
  },
  date: {
    fontSize: scale(themes.MediumFontSize),
    color: themes.Black,
    fontFamily: themes.MontserratMediumItalic,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  botStyle: {
    backgroundColor: themes.gray1,
  },
  col1: {
    flex: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  col2: {
    flex: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  label: {
    fontSize: scale(13),
    fontFamily: themes.MontserratMediumItalic,
    lineHeight: scale(20),
  },
  title: {
    fontFamily: themes.MontserratSemiBoldItalic,
    fontSize: scale(13),
  },
});

export default styles;
