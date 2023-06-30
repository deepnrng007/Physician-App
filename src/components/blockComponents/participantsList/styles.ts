import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  col1: {
    flex: 20,
  },
  col2: {
    flex: 80,
  },
  item: {
    marginBottom: scale(10),
    marginTop: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    fontWeight: "700",
  },
  badge: {
    padding: scale(5),
    backgroundColor: themes.LightGray2,
    alignSelf: "flex-start",
    borderRadius: scale(4),
    marginTop: scale(6),
  },
  typeLabel: {
    fontSize: scale(themes.MediumFontSize),
    fontWeight: "600",
    color: themes.DarkGray,
  },
  countMembers: {
    fontSize: scale(themes.NormalFontSize),
    color: themes.DarkGray,
    marginBottom: scale(20),
  },
  title: {
    fontSize: scale(themes.FontSize22),
    color: themes.gray20,
    alignSelf: "center",
    marginBottom: scale(24),
    marginTop: scale(15),
  },
});

export default styles;
