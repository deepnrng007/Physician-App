import { themes } from "./../../../enums/themes";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    minHeight: scale(44),
    height: scale(48),
    marginBottom: scale(13),
    justifyContent: "center",
    alignItems: "center",
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightSectionContainer: {
    marginLeft: scale(19.5),
    height: scale(42),
    flexDirection: "row",
    flex: 20,
  },
  mainTitleContainer: {
    justifyContent: "center",
    flexDirection: "column",
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
  },
  rightTextContainer: {
    justifyContent: "center",
    marginRight: scale(10),
  },
  titleStyle: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    fontWeight: "bold",
  },
  descriptionStyle: {
    fontSize: scale(themes.SmallFontSize),
    color: themes.DarkGray,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  navigatorTitleView: {
    backgroundColor: themes.LightGray2,
    marginTop: scale(6),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    padding: scale(4),
    borderRadius: scale(4.5),
  },
  descriptionMargin: {
    marginTop: scale(6),
  },
});
