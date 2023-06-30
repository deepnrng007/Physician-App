import React from "react";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

const EpisodeTabPatientDetails = ({
  navigatorName,
  name,
  problem,
  date,
  searchText,
}: any) => {
  return (
    <>
      <AppText style={styles.navigatorName} numberOfLines={1}>
        {navigatorName}
      </AppText>
      <AppText style={styles.problem} numberOfLines={1}>
        {problem}
      </AppText>
      <AppText
        style={styles.name}
        searchKeywords={[searchText]}
        numberOfLines={1}
      >
        {`Patient Name: ${name}`}
      </AppText>
      <AppText style={styles.date} numberOfLines={1}>
        {date}
      </AppText>
    </>
  );
};

export default EpisodeTabPatientDetails;

EpisodeTabPatientDetails.defaultProps = {
  searchText: "",
};
