import { View, ViewStyle } from "react-native";
import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import AppText from "../appText";
import { getNameAlphabets } from "../../../utils/utils";

type GroupImagesProps = {
  groupConversationIcon: string;
  name: string;
  imageSize: number;
};

const GroupImages = ({
  groupConversationIcon,
  name,
  imageSize,
}: GroupImagesProps) => {
  const imagesStyle = {
    width: scale(imageSize),
    height: scale(imageSize),
    borderRadius: scale(imageSize) / 2,
    borderWidth: 2,
    borderColor: "#CCECF5",
  };
  const emptyImageStyle = {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.snuff,
    borderWidth: 0,
  };
  return (
    <View style={styles.container}>
      {groupConversationIcon !== "" ? (
        <Image style={[imagesStyle]} source={{ uri: groupConversationIcon }} />
      ) : (
        <View style={[imagesStyle, emptyImageStyle] as ViewStyle}>
          <AppText style={styles.alphabets}>{getNameAlphabets(name)}</AppText>
        </View>
      )}
    </View>
  );
};

export default GroupImages;

GroupImages.defaultProps = {
  list: [],
  imageSize: 50,
};
