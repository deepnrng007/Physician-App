import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { getDeviceDimenstion } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    width: getDeviceDimenstion("width"),
    height: getDeviceDimenstion("height"),
  },
  preview: {
    flex: 1,
  },
  closeIcon: {
    marginTop: scale(20),
    marginLeft: scale(20),
    backgroundColor: themes.Black2,
    alignSelf: "flex-start",
    padding: scale(10),
    borderRadius: scale(20),
  },
  timer: {
    textAlign: "center",
    color: themes.LightGray4,
    fontSize: scale(themes.LargeFontSize),
  },
  buttonsContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    marginBottom: scale(80),
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: scale(20),
    marginRight: scale(20),
  },
  label: {
    marginTop: scale(10),
    textAlign: "center",
    color: themes.LightGray4,
    fontSize: scale(themes.LargeFontSize),
  },
});

export default styles;
