import { View } from "react-native";
import React from "react";
import styles from "./styles";

const Underline = ({ style }: any) => {
  return <View style={[styles.underline, style]} />;
};

export default Underline;
