import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themes.DeepKLightgray,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.LighGray3,
    marginLeft: scale(themes.PaddingArroundValue),
    marginRight: scale(themes.PaddingArroundValue),
    borderRadius: scale(8),
    padding: scale(13),
  },
  box1: {
    flex: 40,
  },
  box2: {
    flex: 60,
  },
  round: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(100),
    backgroundColor: themes.LighGray3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    color: themes.gray20,
    fontSize: scale(themes.ExtraLargeFontSize),
    lineHeight: scale(19),
  },
  message: {
    fontSize: scale(themes.MediumFontSize),
    lineHeight: scale(19),
  },
});

export default styles;
