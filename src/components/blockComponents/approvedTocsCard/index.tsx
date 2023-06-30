import { View } from "react-native";
import React from "react";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { getBGColor, getLocaleTime, getTextColor } from "../../../utils/utils";

const ApprovedTocsCard = ({
  navigatorName,
  name,
  problem,
  date,
  details,
  style,
  searchText,
  trackStatus,
}: any) => {
  return (
    <View style={[style]}>
      <View style={styles.nagivatorDate}>
        <AppText style={styles.navigatorName}>{navigatorName}</AppText>
        <View
          style={
            searchText ? [styles.statusBadge, getBGColor(trackStatus)] : {}
          }
        >
          <AppText style={[styles.date, getTextColor(trackStatus)]}>
            {searchText ? trackStatus : getLocaleTime(date, "MM/DD/YYYY")}
          </AppText>
        </View>
      </View>
      <AppText style={styles.name} searchKeywords={[searchText]}>
        {name}
      </AppText>
      <AppText style={styles.details}>{details}</AppText>
      <AppText style={styles.problem}>{problem}</AppText>
    </View>
  );
};

export default ApprovedTocsCard;
