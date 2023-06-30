import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  image: {
    width: "100%",
    height: scale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    opacity: 0.4,
  },
  dates: {
    marginTop: scale(6),
    fontSize: scale(themes.MediumFontSize),
  },
  activity: {
    position: "absolute",
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  uploadView: {
    position: "absolute",
    bottom: scale(10),
    left: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  dateTick: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
