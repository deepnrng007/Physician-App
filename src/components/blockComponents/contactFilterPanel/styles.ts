import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(themes.PaddingArroundValue),
    justifyContent: "space-between",
  },
  filterTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: scale(themes.FontSize22),
    color: themes.gray20,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  locationContainer: {
    marginTop: scale(25),
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
});

export default styles;
