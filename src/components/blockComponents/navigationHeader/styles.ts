import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: scale(16),
    paddingBottom: scale(16),
  },
  back: {
    width: "10%",
    height: scale(30),
    justifyContent: "center",
  },
  rightIcon: {
    width: "10%",
    alignItems: "flex-end",
  },
  profile: {
    width: "20%",
  },
  navigationTitle: {
    fontFamily: themes.MontserratRegular,
    color: themes.gray20,
    fontSize: scale(themes.FontSize22),
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: scale(27),
  },
  navigationTitleView: {
    alignItems: "center",
    width: "70%",
  },
});

export default styles;
