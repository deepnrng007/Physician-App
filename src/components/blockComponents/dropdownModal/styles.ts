import { isAndroid } from "./../../../utils/utils";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    fontFamily: themes.MontserratSemiBoldFont,
    fontStyle: "normal",
    fontSize: scale(themes.FontSize22),
    lineHeight: scale(26.8),
    textAlign: "center",
    color: themes.gray20,
    alignContent: "center",
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(50),
    marginTop: isAndroid() ? 0 : scale(50),
    paddingLeft: scale(10),
  },
  item: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(61),
  },
  textItem: {
    flex: 0.7,
    marginLeft: scale(20),
    color: themes.gray20,
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    fontFamily: themes.MontserratSemiBoldFont,
    fontStyle: "normal",
  },
  itemSeparator: { height: 1, backgroundColor: "black", opacity: 0.1 },
  flatListView: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(20),
  },
  flatList: { width: "100%", marginTop: scale(20) },
  contentContainer: {
    width: "100%",
    flexGrow: 1,
  },
});
