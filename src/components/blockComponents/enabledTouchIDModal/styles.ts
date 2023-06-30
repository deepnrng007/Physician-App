import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: scale(14),
    fontSize: scale(24),
    color: themes.gray20,
  },
  titleDesc: {
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: scale(14),
    lineHeight: scale(22),
  },
  bold: {
    fontWeight: "700",
  },
});

export default styles;
