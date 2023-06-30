import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../../enums/themes";
import { disableShadow } from "../../../../utils/utils";

export const styles = StyleSheet.create({
  navigatorNotesCard: {
    backgroundColor: themes.White,
    borderWidth: scale(themes.borderWidthSize),
    marginTop: scale(10),
    marginBottom: scale(24),
    borderColor: themes.shadowGreen,
    borderRadius: scale(8),
    alignSelf: "center",
    ...disableShadow(),
  },
  notesContentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notesTitle: {
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
    fontFamily: themes.MontserratBoldFont,
  },
  notesDate: {
    fontSize: scale(themes.MediumFontSize),
    color: themes.Black1,
  },
  notesDescription: {
    flex: 0.8,
    marginTop: scale(8),
    color: themes.Black1,
    fontSize: scale(themes.MediumFontSize),
  },
});
