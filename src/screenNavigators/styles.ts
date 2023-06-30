import { Platform } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../enums";
import { getShadow } from "../utils/utils";

const isAndroid = Platform.OS === "android";

const styles = ScaledSheet.create({
  container: {
    padding: 0,
  },
  headerContainer: {
    padding: scale(themes.PaddingArroundValue),
  },
  activeDot: {
    marginTop: scale(5),
    marginBottom: scale(2),
    backgroundColor: themes.green,
  },
  tabBarIcon: {
    alignItems: "center",
    ...(isAndroid ? { justifyContent: "center", paddingTop: scale(10) } : {}),
  },
  dotStyle: {
    backgroundColor: themes.White,
    marginTop: scale(5),
    marginBottom: scale(2),
  },
  label: {
    width: "100%",
    color: themes.White,
    fontSize: "10@s",
  },
  tabLabel: {
    width: "100%",
    fontSize: scale(10),
    color: themes.green,
  },
  tabLabelInactive: {
    color: themes.lightGray1,
  },
  barStyle: {
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: themes.White,
    paddingLeft: scale(6),
    paddingRight: scale(6),
    ...(isAndroid
      ? {
          height: scale(70),
          justifyContent: "center",
          position: "absolute",
        }
      : { height: scale(70), paddingTop: scale(15) }),
    ...getShadow(),
  },
  drawerStyles: {
    flex: 1,
    width: "90%",
  },
});

export default styles;
