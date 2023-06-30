import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import { Props } from "./type";

const PatientDetail = ({ name, gender, age, testID }: Props) => {
  return (
    <View style={styles.patientDetailView}>
      <AppText testID={testID} style={styles.patientName}>
        {name}
      </AppText>
      <AppText style={styles.patientDetailText}>
        {gender}, {age} Yrs
      </AppText>
    </View>
  );
};

export default PatientDetail;
