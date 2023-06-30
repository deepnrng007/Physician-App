import { View, ViewStyle } from "react-native";
import React from "react";
import LeftRightValueBox from "../../baseComponents/leftRightValueBox";
import AppText from "../../baseComponents/appText";
import { episodeTrackStatus } from "../../../enums/constants";
import styles from "./styles";

type PatientsDetailsProps = {
  list: any[];
  style?: ViewStyle;
  status: string;
};

const PatientsDetails = ({ list, style, status }: PatientsDetailsProps) => {
  const isOffTrack = status === episodeTrackStatus.OFFTRACK;
  const isOnTrack = status === episodeTrackStatus.ONTRACK;
  const isTocPending = status === episodeTrackStatus.TOCPENDING;
  const isTocNotCreated = status === episodeTrackStatus.TOCNOTCREATED;

  const checkStatus = () => {
    if (isOnTrack) return styles.onTrack;
    else if (isOffTrack) return styles.offTrack;
    else if (isTocPending || isTocNotCreated) return styles.tocStatus;
  };

  const getTextColor = () => {
    if (isOnTrack) return styles.onTrackTitle;
    else if (isOffTrack) return styles.offTrackTitle;
    else if (isTocPending || isTocNotCreated) return styles.tocStatusTitle;
  };
  return (
    <>
      <View style={[styles.statusValue, checkStatus()]}>
        <AppText style={[styles.title, getTextColor()]}>{status}</AppText>
      </View>
      <View style={[style]}>
        {list.map((item, index) => {
          return (
            <LeftRightValueBox
              key={index}
              leftValue={item.title}
              rightValue={item.value}
            />
          );
        })}
      </View>
    </>
  );
};

export default PatientsDetails;
