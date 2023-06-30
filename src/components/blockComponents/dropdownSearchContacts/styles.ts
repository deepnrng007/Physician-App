import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  searchBoxContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: themes.LightGreen2,
    borderRadius: scale(8),
    padding: scale(10),
    paddingLeft: 0,
  },
  badge: {
    backgroundColor: themes.LightGreen3,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: scale(30),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderRadius: scale(15),
    marginTop: scale(8),
  },
  badgeLabel: {
    fontSize: scale(themes.LargeFontSize),
    marginRight: scale(10),
    color: themes.gray20,
  },
  badgeContainer: {
    paddingLeft: scale(12),
    justifyContent: "center",
  },
  borderradiusTop: {
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  borderradiusBottom: {
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  searchBox: {
    borderWidth: 0,
    height: scale(30),
  },
  selectedLabel: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    marginRight: scale(5),
  },
  arrowButton: {
    backgroundColor: themes.arrowBackground,
    height: scale(30),
    borderRadius: scale(4),
    flexDirection: "row",

    alignItems: "center",
    paddingLeft: scale(7),
    paddingRight: scale(7),
  },
  row: {
    backgroundColor: themes.snuff,
    height: scale(50),
    justifyContent: "center",
    paddingLeft: scale(25),
  },
  label: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  selectedItemsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: scale(20),
  },
});

export default styles;
