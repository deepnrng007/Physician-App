import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { avatarProps } from "./types";

const Avatar = (props: avatarProps) => {
  const { img } = props;
  const { imageContainer, image } = styles;
  const { container } = styles;

  const renderImage = () => {
    return (
      <View style={imageContainer}>
        <Image style={image} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    const { placeholder } = props;
    const { placeholderContainer, placeholderText } = styles;

    return (
      <View style={placeholderContainer}>
        <View style={placeholderContainer}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.01}
            style={placeholderText}
          >
            {placeholder}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>{img ? renderImage() : renderPlaceholder()}</View>
  );
};

export default Avatar;
