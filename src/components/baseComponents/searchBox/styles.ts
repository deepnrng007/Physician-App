import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  searchView: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: themes.searchBoxBorder,
    alignItems: "center",
    paddingLeft: scale(15),
    borderRadius: scale(8),
    paddingTop: 1,
    paddingBottom: 1,
    height: scale(48),
  },
  searchBox: {
    height: scale(45),
    fontSize: scale(themes.fontSize15),
    width: "80%",
    opacity: 0.6,
    borderBottomWidth: 0,
    color: themes.Black1,
  },
  icon: {
    fontSize: scale(20),
    color: themes.LightGreen3,
  },
});

export default styles;
