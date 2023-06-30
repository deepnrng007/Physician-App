import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  countryCode: {
    width: scale(70),
    height: scale(50),
    backgroundColor: themes.White,
    opacity: 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: scale(8),
  },
  codeLabel: {
    color: themes.Black,
    fontSize: scale(themes.LargeFontSize),
  },
  item: {
    backgroundColor: themes.White,
    opacity: 0.8,
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  itemLabel: {
    color: themes.gray20,
    fontSize: scale(themes.LargeFontSize),
  },
  flatListContainer: {
    position: "absolute",
    marginTop: scale(55),
    maxHeight: scale(200),
  },
});

export default styles;
