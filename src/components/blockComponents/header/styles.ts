import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  profile: {
    width: "20%",
    marginRight: scale(14),
  },
  iconButton: {
    marginRight: scale(15),
  },
  dotStyle: {
    position: "absolute",
    top: scale(-8),
    right: 0,
    zIndex: 9,
    backgroundColor: themes.Red,
  },
});

export default styles;
