import { View, SafeAreaView } from "react-native";
import React from "react";
import AppText from "../appText";
import AppButton from "../appButton";
import { CloseIcon } from "../../../utils/imagePaths";
import styles from "./styles";
import { langVar, translate } from "../../../enums";
import { scale } from "react-native-size-matters";

type props = {
  onDismiss: any;
  title: string;
  patientDetails: {
    patientName: string;
    procedureName: string;
    procudureDate: string;
  };
};
const RightSideChatPanelPatientDetails = ({
  onDismiss,
  title,
  patientDetails,
}: props) => {
  const { patientName, procedureName, procudureDate } = patientDetails;
  const data = [
    { title: `${translate.t(langVar.patientName)}: `, value: patientName },
    {
      title: `${translate.t(langVar.procedureName)}: `,
      value: procedureName,
    },
    { title: `${translate.t(langVar.procedureDate)}: `, value: procudureDate },
  ];
  return (
    <SafeAreaView>
      <View>
        <View style={styles.filterTitleView}>
          <AppText numberOfLines={1} style={styles.filterTitle}>
            {title}
          </AppText>
          <AppButton onPress={onDismiss}>
            <CloseIcon />
          </AppButton>
        </View>
      </View>
      {data.map((item, index) => {
        const { title, value } = item;
        return (
          <View key={index} style={{ flexDirection: "row", marginTop: 10 }}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.value}>{value}</AppText>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default RightSideChatPanelPatientDetails;

RightSideChatPanelPatientDetails.defaultProps = {
  patientDetails: {
    patientName: "Priyanka",
    procedureName: "Headeche",
    procudureDate: "20-04-2022",
  },
};
