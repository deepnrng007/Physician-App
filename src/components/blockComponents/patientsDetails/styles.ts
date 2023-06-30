import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  statusValue: {
    borderRadius: scale(70),
    alignSelf: "center",
  },
  onTrack: {
    backgroundColor: themes.LightGreen7,
  },
  offTrack: {
    backgroundColor: themes.LightRed,
  },
  tocStatus: {
    backgroundColor: themes.LightGreen8,
  },
  title: {
    paddingVertical: scale(5),
    paddingHorizontal: scale(14),
    fontFamily: themes.MontserratRegular,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: scale(themes.MediumFontSize),
    lineHeight: scale(20),
    textAlign: "center",
  },
  onTrackTitle: {
    color: themes.successGreen,
  },
  offTrackTitle: {
    color: themes.Red,
  },
  tocStatusTitle: {
    color: themes.gray2,
  },
  statusLabel: {
    color: themes.White,
    fontFamily: themes.MontserratSemiBoldFont,
  },
});

export default styles;
