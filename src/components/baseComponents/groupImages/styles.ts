import { scale, ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
  },
  alphabets: {
    fontSize: scale(16),
  },
});

export default styles;
