import { themes } from "./../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = (isRead?: boolean) =>
  StyleSheet.create({
    mainView: {
      height: scale(81),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isRead ? themes.LightGray5 : themes.White,
    },
    time: {
      fontFamily: themes.MontserratBoldFont,
      fontSize: scale(themes.SmallFontSize),
      lineHeight: scale(15),
      color: themes.gray2,
    },
    message: {
      fontFamily: themes.MontserratRegular,
      fontWeight: "500",
      fontStyle: "normal",
      fontSize: scale(themes.LargeFontSize),
      color: themes.gray20,
      lineHeight: scale(20),
    },
    name: {
      fontFamily: themes.MontserratRegular,
      fontWeight: "700",
      fontStyle: "normal",
      fontSize: scale(themes.LargeFontSize),
      color: themes.gray20,
      lineHeight: scale(20),
    },
    clear: {
      color: themes.White,
      fontWeight: "600",
      fontStyle: "normal",
      fontFamliy: themes.MontserratRegular,
      fontSize: scale(themes.NormalFontSize),
      lineHeight: scale(20),
      paddingHorizontal: scale(30),
      paddingVertical: scale(20),
    },
    clearView: {
      backgroundColor: themes.orange,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    leftIcon: { flex: 0.2, marginLeft: scale(16) },
    detailView: { flex: 0.9 },
    arrow: {
      flex: 0.05,
      justifyContent: "flex-end",
      marginRight: scale(16),
    },
    highlightStyle: {
      color: themes.gray20,
      fontWeight: "700",
    },
  });
