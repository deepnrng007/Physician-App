import { scale, ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  dropdownContainer: {
    flex: 1, //android
    width: "100%",
    zIndex: 1,
    paddingBottom: scale(10),
    paddingTop: scale(10),
    position: "absolute",
  },
});

export default styles;
