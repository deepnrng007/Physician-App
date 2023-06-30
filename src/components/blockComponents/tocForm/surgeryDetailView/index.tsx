import { View } from "react-native";
import React, { useState } from "react";
import ToCDaysInput from "../numberInput";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import { langVar, themes, translate } from "../../../../enums";
import { ErrorMessageIcon } from "../../../../utils/imagePaths";

type Props = {
  defaultDays: number;
  surgeryName: string;
  surgeryHospitalName: string;
  isDisabled: boolean;
  testID?: string;
  isApproved: boolean;
  onChangeAcuteLoS: any;
};
const SurgeryDetailView = ({
  defaultDays,
  surgeryName,
  surgeryHospitalName,
  isDisabled,
  testID,
  isApproved,
  onChangeAcuteLoS,
}: Props) => {
  const [error, setError] = useState(false);

  return (
    <View>
      <View style={styles.surgeryNameView}>
        <AppText style={styles.surgeryName}>{surgeryName}</AppText>
        <AppText style={styles.acuteLoSLabel}>
          {translate.t(langVar.acuteLoS)}
        </AppText>
      </View>
      <View style={styles.surgeryHospitalView}>
        <AppText
          numberOfLines={2}
          style={{ ...styles.acuteLoSLabel, flex: 0.75, marginRight: 16 }}
        >
          {surgeryHospitalName}
        </AppText>
        {isApproved ? (
          <AppText style={styles.locationDay}>{defaultDays}</AppText>
        ) : (
          <ToCDaysInput
            testID={testID}
            defaultDays={defaultDays.toString()}
            isDisabled={isDisabled}
            style={{
              flex: 0.15,
              opacity: isDisabled ? 0.4 : 1,
              borderColor: isDisabled
                ? themes.searchBoxBorder
                : error
                ? themes.ErrorRed
                : themes.searchBoxBorder,
            }}
            onChangeTOCDays={(value: string) => {
              if (Number(value) === 0 || Number(value) > 50) {
                setError(true);
              } else {
                setError(false);
              }
              onChangeAcuteLoS(value);
            }}
          />
        )}
      </View>
      {!isDisabled && error && (
        <View style={styles.errorView}>
          <ErrorMessageIcon />
          <AppText numberOfLines={2} style={styles.acuteLoSErrorLabel}>
            {translate.t(langVar.acuteLOSError)}
          </AppText>
        </View>
      )}
    </View>
  );
};

export default SurgeryDetailView;
