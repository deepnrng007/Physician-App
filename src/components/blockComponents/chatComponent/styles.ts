import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { getShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  gradient: {
    padding: scale(1),
    borderRadius: scale(4),
    width: "70%",
    marginBottom: scale(10),
  },
  navigation: {
    paddingLeft: scale(16),
  },
  attachmentContainer: {
    position: "absolute",
    //alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: themes.borderColor1,
    backgroundColor: themes.transparent50,
    zIndex: 3,
    width: "100%",
    height: "150%",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  composer: {
    backgroundColor: themes.White,
    ...getShadow(),
    borderTopLeftRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    //height: scale(50),
    //minHeight: scale(65),
    padding: scale(10),
  },
  textInputContainer: {
    backgroundColor: themes.snuff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderRadius: scale(4),
  },
  sendButton: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  composerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: scale(8),
    backgroundColor: themes.White,
  },
  inputText: {
    width: "90%",
    fontSize: scale(themes.LargeFontSize),
    minHeight: scale(40),
    maxHeight: scale(200),
    lineHeight: scale(20),
    color: themes.gray20,
  },
  sendStyle: {
    justifyContent: "center",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(20),
    marginTop: scale(20),
  },
  day: {
    fontSize: scale(themes.MediumFontSize),
    paddingLeft: scale(5),
    paddingRight: scale(5),
    color: themes.Black,
  },
  underline: {
    flex: 1,
    backgroundColor: themes.shadowGreenOpacity40,
    height: scale(1),
  },
  currentUSer: {
    backgroundColor: themes.messageBGColor,
  },
  name: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.green4,
    lineHeight: scale(17),
    marginTop: scale(3),
    marginBottom: scale(8),
  },
  bubble: {
    padding: scale(10),
    borderRadius: scale(4),
    backgroundColor: themes.White,
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(18),
  },
  dates: {
    marginTop: scale(6),
    fontSize: scale(themes.MediumFontSize),
  },
  optionLabel: {
    fontSize: scale(themes.NormalFontSize),
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themes.Black3,
    padding: scale(7),
    paddingLeft: scale(4),
    borderRadius: scale(8),
  },
  fileName: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.gray20,
    fontFamily: themes.MontserratSemiBoldFont,
  },
  fileSize: {
    fontSize: scale(themes.MediumFontSize),
    color: themes.gray20Opacity60,
  },
  dateTick: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
