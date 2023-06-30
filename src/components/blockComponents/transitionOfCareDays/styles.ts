import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListStyle: {
    paddingBottom: scale(20),
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: themes.LightGreen2,
    backgroundColor: themes.LightGreen,
    alignSelf: "flex-start",
    // padding: scale(5),
    paddingTop: scale(10),
    paddingBottom: scale(10),
    width: scale(46),
    height: scale(85),
    marginRight: scale(8),
    borderRadius: scale(8),
  },
  label: {
    fontSize: scale(themes.MediumFontSize),
    color: themes.Black,
    textAlign: "center",
  },
  bold: {
    fontSize: scale(themes.NormalFontSize),
    fontFamily: themes.MontserratRegular,
    fontWeight: "700",
  },
});

export default styles;
