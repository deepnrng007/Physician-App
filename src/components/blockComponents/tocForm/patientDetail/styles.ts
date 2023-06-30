import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";

export const styles = StyleSheet.create({
  patientDetailView: {
    marginTop: scale(16),
  },
  patientName: {
    color: themes.gray20,
    fontFamily: themes.MontserratBoldFont,
    fontSize: scale(themes.FontSize24),
  },
  patientDetailText: {
    color: themes.Black1,
    fontSize: scale(themes.LargeFontSize),
  },
});
