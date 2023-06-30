import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { disableShadow } from "../../../utils/utils";

const styles = ScaledSheet.create({
  titleCount: {
    marginBottom: scale(15),
  },
  card: {
    width: "100%",
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    borderRadius: scale(8),
    ...disableShadow(),
  },
  col1: {
    flex: 80,
  },
  col2: {
    flex: 20,
    alignItems: "flex-end",
  },
  arrow: {
    width: "100%",
    alignItems: "center",
    paddingTop: scale(4),
  },
  icon: {
    fontSize: scale(15),
    color: themes.Black,
  },
  layer1: {
    height: scale(10),
    backgroundColor: themes.LightGreen6,
    width: "95%",
    alignSelf: "center",
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  layer2: {
    height: scale(8),
    backgroundColor: themes.LightGreen5,
    opacity: 0.6,
    width: "90%",
    alignSelf: "center",
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    marginBottom: scale(15),
  },
});

export default styles;
