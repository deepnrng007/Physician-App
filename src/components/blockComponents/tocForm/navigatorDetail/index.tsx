import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import { Props } from "./type";
import { langVar, translate } from "../../../../enums";

const NavigatorDetail = ({ navigatorName }: Props) => {
  return (
    <View style={styles.navigatorDetailView}>
      <AppText style={styles.navigatorAssignedText}>
        {translate.t(langVar.navigatorAssigned)}:
      </AppText>
      <AppText style={styles.navigatorName}>{navigatorName}</AppText>
    </View>
  );
};

export default NavigatorDetail;
