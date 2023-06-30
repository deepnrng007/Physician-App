import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  paddingAround: {
    flex: 1,
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
  },
  contactAlphabetView: {
    flex: 1,
    flexDirection: "row",
  },
  contactView: { flex: 0.9, marginTop: scale(28) },
  alphabetView: {
    flex: 0.1,
    alignItems: "flex-end",
    marginTop: scale(28),
    marginBottom: scale(6),
  },
});

export default styles;
