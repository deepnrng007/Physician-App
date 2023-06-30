import { View } from "react-native";
import React from "react";
import AppText from "../../baseComponents/appText";
import moment from "moment";
import styles from "./styles";
import { FormListProps } from "./type";
import { Card } from "react-native-paper";

const FormList = ({ onPress }: FormListProps) => {
  return (
    <Card onPress={onPress}>
      <View style={styles.status}>
        <AppText style={styles.statusLabel}>Pending</AppText>
      </View>
      <View style={styles.dateContainer}>
        <AppText style={styles.navName}>Shah, Rs NAvigator</AppText>
        <AppText style={styles.date}>
          Sent: {moment(new Date()).format("MM/DD/YYYY at hh:mm")}
        </AppText>
      </View>
      <View style={[styles.dateContainer, styles.details]}>
        <AppText style={styles.name}>John Doe </AppText>
        <AppText style={styles.date}>M, 66 Yrs, Surgery Date 1/18/22</AppText>
      </View>
      <AppText style={styles.date}>
        Back and neck Procedure of C spine, Non Fusion
      </AppText>
    </Card>
  );
};

export default FormList;

FormList.defaultProps = {
  onPress: () => {},
  data: {},
};
