import React from "react";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

const TocsHorizontalList = ({ navigatorName, name, problem, date }: any) => {
  return (
    <>
      <AppText style={styles.navigatorName}>{navigatorName}</AppText>
      <AppText style={styles.name}>{name}</AppText>
      <AppText style={styles.problem}>{problem}</AppText>
      <AppText style={styles.date}>{date}</AppText>
    </>
  );
};

export default TocsHorizontalList;
