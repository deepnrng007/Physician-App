import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { getShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    marginTop: scale(2),
    backgroundColor: themes.White,
    ...getShadow(),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  attachmentContainer: {
    position: "absolute",
    zIndex: 3,
    width: "100%",
  },
  optionLabel: {
    fontSize: scale(themes.NormalFontSize),
    fontFamily: themes.MontserratSemiBoldFont,
    color: themes.gray20,
    marginLeft: scale(10),
  },
  button: {
    height: scale(60),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderWidth: 1,
    borderColor: themes.green3,
    borderRadius: scale(8),
    marginVertical: scale(10),
    alignSelf: "center",
    width: "80%",
  },
  galleryBtn: {
    backgroundColor: themes.green,
    marginTop: scale(50),
  },
});

export default styles;
