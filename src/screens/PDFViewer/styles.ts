import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../enums";
import { getShadow } from "../../utils/utils";

const styles = StyleSheet.create({
  container: {
    padding: scale(0),
    backgroundColor: themes.White,
  },
  pdfViewer: {
    flex: 1,
    backgroundColor: themes.White,
    paddingLeft: scale(10),
    paddingRight: scale(10),
  },
  acceptButtons: {
    padding: scale(16),
    backgroundColor: themes.White,
  },
  tickLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: scale(themes.LargeFontSize),
    paddingRight: scale(30),
  },
  tandclabel: {
    color: themes.green,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(15),
  },
  submitButton: {
    width: "45%",
    backgroundColor: themes.green,
    alignSelf: "flex-start",
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
  },
  btnlabel: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
  },
  btnborder: {
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: themes.green3,
  },
  disableSubmit: {
    opacity: 0.4,
  },
});

export default styles;
