import { scale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { themes } from "../../../../enums";

const imageSize = 50;

export const styles = StyleSheet.create({
  container: {
    width: imageSize,
    height: imageSize,
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: imageSize,
    height: imageSize,
    borderRadius: scale(Math.round(imageSize + imageSize) / 2),
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themes.snuff,
    height: "100%",
    borderColor: themes.lightBlue,
    borderWidth: scale(themes.borderWidthSize),
    borderRadius: scale(Math.round(imageSize + imageSize) / 2),
  },
  placeholderText: {
    fontWeight: "normal",
    color: themes.darkGray,
    fontSize: scale(17),
  },
});
