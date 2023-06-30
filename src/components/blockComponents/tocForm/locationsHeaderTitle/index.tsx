import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";

type Props = {
  location?: string;
  locationName?: string;
  type: string;
  isDisabled: boolean;
  isApproved: boolean;
};
const LocationHeaderTitle = ({
  location,
  locationName,
  type,
  isDisabled = false,
  isApproved = false,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 40,
      }}
    >
      <AppText
        style={{
          ...styles.locationText,
          flex: 0.25,
          opacity: isDisabled ? 0.4 : 1,
        }}
      >
        {location}
      </AppText>
      <AppText
        style={{
          ...styles.locationText,
          flex: 0.6,
          opacity: isDisabled ? 0.4 : 1,
        }}
      >
        {locationName}
      </AppText>
      <View
        style={{
          flex: 0.15,
          alignItems: isApproved ? "flex-end" : "flex-start",
        }}
      >
        <AppText
          style={{
            ...styles.locationText,
            opacity: isDisabled ? 0.4 : 1,
          }}
        >
          {type}
        </AppText>
      </View>
    </View>
  );
};

export default LocationHeaderTitle;
