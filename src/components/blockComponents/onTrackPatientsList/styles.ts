import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { disableShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 65,
  },
  card: {
    width: "100%",
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: scale(8),
    marginBottom: scale(12),
    ...disableShadow(),
  },
  titleCount: {
    marginTop: scale(30),
    marginBottom: scale(20),
  },
  iconContainer: {
    flex: 35,
    height: scale(80),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statusBadge: {
    backgroundColor: themes.LightGreen4,
    padding: scale(3),

    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderRadius: scale(20) / 2,
  },
  status: {
    color: themes.gray2,
    fontSize: scale(themes.MediumFontSize),
  },
  icon: {
    fontSize: scale(20),
    color: themes.green,
  },
  offTrack: {
    backgroundColor: themes.RedTransparent20,
  },
  offTrackLabel: {
    color: themes.Red3,
  },
});

export default styles;
