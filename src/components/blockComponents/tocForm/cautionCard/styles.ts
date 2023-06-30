import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";
import { disableShadow } from "../../../../utils/utils";

export const styles = StyleSheet.create({
  cautionCard: {
    backgroundColor: themes.Red2,
    borderWidth: scale(themes.borderWidthSize),
    marginTop: scale(10),
    borderColor: themes.Red1,
    borderRadius: scale(8),
    alignSelf: "center",
    ...disableShadow(),
  },
  highlightedText: {
    fontFamily: themes.MontserratBoldFont,
    fontSize: scale(themes.MediumFontSize),
    lineHeight: scale(15),
    color: themes.LightGray7,
  },
  text: {
    fontFamily: themes.MontserratMediumFont,
    fontSize: scale(themes.MediumFontSize),
    lineHeight: scale(15),
    color: themes.LightGray7,
  },
});
