import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  detailView: {
    marginHorizontal: scale(16),
    marginBottom: scale(7),
  },
  underLine: {
    marginTop: scale(24),
    marginBottom: scale(32),
  },
  tocPlanText: {
    fontSize: scale(themes.FontSize22),
    color: themes.Black,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  loaderView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
