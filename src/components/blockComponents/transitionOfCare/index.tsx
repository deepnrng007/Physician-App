import { View, ViewStyle } from "react-native";
import React from "react";
import { langVar, translate } from "../../../enums";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import TransitionOfCareDays from "../transitionOfCareDays";
import { getDateFormatForDay, getLocaleTime } from "../../../utils/utils";

type TransitionOfCareProps = {
  list: any[];
  tocDetail: any;
};

const TransitionOfCare = ({ list, tocDetail }: TransitionOfCareProps) => {
  return (
    <View>
      <AppText style={styles.title}>
        {translate.t(langVar.transitionOfCare)}
      </AppText>
      <View style={styles.NoteContainer}>
        <AppText style={[styles.label, styles.bold]}>
          {`${translate.t(langVar.navigator)}: `}
        </AppText>
        <AppText style={styles.label}>
          {tocDetail.SentToDischargePlannerDate
            ? `${tocDetail.Intake.PrimaryCareManagerName}         
Sent: ${getDateFormatForDay(
                tocDetail.SentToDischargePlannerDate,
                "MM/DD/YYYY"
              )} at ${getLocaleTime(
                tocDetail.SentToDischargePlannerDate,
                "hh:mm a"
              )}`
            : tocDetail.Intake.PrimaryCareManagerName}
        </AppText>
      </View>
      <View style={[styles.NoteContainer, { flexDirection: "column" }]}>
        <AppText style={[styles.label, styles.bold]}>
          {translate.t(langVar.noteFromNavigator)}
        </AppText>
        <AppText style={styles.label}>{tocDetail.NoteCareManager}</AppText>
      </View>
      <TransitionOfCareDays style={styles.daysStyle as ViewStyle} list={list} />
    </View>
  );
};

export default TransitionOfCare;
