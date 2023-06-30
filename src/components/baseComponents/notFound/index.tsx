import { View } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../appText";

const NotFound = () => {
  return (
    <View style={styles.notfound}>
      <AppText>Search Result not Found</AppText>
    </View>
  );
};

export default NotFound;
