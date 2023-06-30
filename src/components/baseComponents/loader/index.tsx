import React from "react";
import { ActivityIndicator, TextStyle, View } from "react-native";
import { themes } from "../../../enums/themes";
import AppText from "../appText";
import styles from "./styles";

type props = {
  isLabelRequired: boolean;
  textStyle?: TextStyle;
  loaderColor?: string;
};

const Loader = ({ isLabelRequired, textStyle, loaderColor }: props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={loaderColor ? loaderColor : themes.Black} />
      {isLabelRequired && (
        <AppText style={[styles.label, textStyle]}>
          Loading, Please wait...
        </AppText>
      )}
    </View>
  );
};

export default Loader;

Loader.defaultProps = {
  isLabelRequired: true,
};
