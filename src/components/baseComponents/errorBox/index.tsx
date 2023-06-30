import { TextStyle, View } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../appText";

type ErrorBoxProps = {
  value: string;
};

const ErrorBox = ({ value }: ErrorBoxProps) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.message as TextStyle}>{value}</AppText>
    </View>
  );
};

export default ErrorBox;
