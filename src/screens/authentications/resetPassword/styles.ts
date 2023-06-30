import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  titleName: {
    fontSize: scale(30),
    fontWeight: "700",
    color: themes.gray20,
    alignSelf: "center",
    marginTop: scale(70),
  },
  labelText: {
    fontSize: scale(themes.LargeFontSize),
    marginTop: scale(20),
    color: themes.gray20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
  },
  inputText: {
    marginTop: scale(45),
    flex: 1,
  },
  backArrow: {
    ...(!isAndroid() ? { marginTop: scale(50) } : { marginTop: scale(10) }),
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 9,
    width: "100%",
  },
});

export default styles;
