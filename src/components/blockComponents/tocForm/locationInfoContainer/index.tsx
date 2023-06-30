import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";

type Props = {
  location: string;
  locationName: string;
  locationDays: string;
  testID?: string;
};
const LocationInfoContainer = ({
  location,
  locationName,
  locationDays,
  testID,
}: Props) => {
  return (
    <View
      accessibilityLabel={testID}
      testID={testID}
      style={styles.locationContainer}
    >
      <AppText style={styles.locationValueText}>{location}</AppText>
      <AppText style={styles.locationName}>{locationName}</AppText>
      <View
        style={{
          flex: 0.15,
          justifyContent: "flex-end",
        }}
      >
        <AppText style={styles.locationDay}>{locationDays}</AppText>
      </View>
    </View>
  );
};

export default LocationInfoContainer;
