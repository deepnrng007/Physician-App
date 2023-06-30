import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  filterTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: scale(themes.FontSize22),
    color: themes.gray20,
    width: "80%",
  },
  title: {
    fontWeight: "700",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
  },
  value: {
    width: "55%",
    fontWeight: "normal",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
  },
});

export default styles;
