import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: scale(20),
  },
  button: {
    flex: 40,
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: themes.green1,
    marginBottom: 1,
    marginTop: 1,
  },
  callButton: {
    backgroundColor: themes.green,
    borderWidth: 0,
  },
  label: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
    marginLeft: scale(5),
  },
  icon: {
    fontSize: scale(20),
  },
  callLabel: {
    color: themes.Black,
  },
});

export default styles;
