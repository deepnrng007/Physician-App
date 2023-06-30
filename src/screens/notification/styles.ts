import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../enums";

export const styles = StyleSheet.create({
  container: {
    padding: scale(0),
    backgroundColor: themes.White,
  },
  underline: {
    marginHorizontal: scale(20),
    marginTop: scale(13),
    marginBottom: scale(16),
  },
});
