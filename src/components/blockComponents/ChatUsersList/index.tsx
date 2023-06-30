import React from "react";
import { View } from "react-native";
import Card from "./../../baseComponents/card";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

const ChatUserList = () => {
  return (
    <Card>
      <AppText style={styles.chatUserNames}>ByrsNav, LouNav</AppText>
      <View style={styles.patientDate}>
        <AppText style={styles.label}>Patient: Antey Pamela</AppText>
        <View style={styles.dateContainer}>
          <AppText style={[styles.label, { fontWeight: "bold" }]}>
            Last:
          </AppText>
          <AppText style={styles.label}>1/18/22 07:19 PM</AppText>
        </View>
      </View>
      <AppText style={styles.message}>Are you Sure?</AppText>
    </Card>
  );
};

export default ChatUserList;
