import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
  },
  messageListContainer: {
    marginTop: scale(10),
    borderRadius: scale(6),
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
  },
  messageContainer: {
    flex: 1,
    marginTop: scale(25),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageDetails: {
    flex: 80,
  },
  nameDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    flex: 50,
    fontFamily: themes.MontserratBoldFont,
    color: themes.Black,
    fontSize: scale(themes.LargeFontSize),
  },
  date: {
    flex: 50,
    textAlign: "right",
    fontSize: scale(themes.MediumFontSize),
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: themes.MontserratMediumFont,
    color: themes.Black1,
  },
  iconContainer: {
    flex: 20,
    alignItems: "flex-end",
  },
  icon: {
    fontSize: scale(20),
    color: themes.green,
  },
  titleCount: {
    marginLeft: 0,
  },
  viewAll: {
    color: themes.green,
    fontSize: scale(themes.LargeFontSize),
    textDecorationLine: "underline",
  },
});

export default styles;
