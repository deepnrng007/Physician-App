import { View } from "react-native";
import React from "react";
import Underline from "../../baseComponents/underline";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

type DisplayDayProps = {
  dateText: any;
};

const DisplayDay = ({ dateText }: DisplayDayProps) => {
  return (
    <View style={styles.dayContainer}>
      <Underline style={styles.underline} />
      <AppText style={styles.day}>{dateText}</AppText>
      <Underline style={styles.underline} />
    </View>
  );
};

export default DisplayDay;
