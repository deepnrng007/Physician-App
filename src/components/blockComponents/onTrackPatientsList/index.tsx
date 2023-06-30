import { View, FlatList, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import TitleIconCount from "../titleIconCount";
import AppText from "../../baseComponents/appText";
import EpisodeTabPatientDetails from "../episodeTabPatientDetails";
import Card from "../../baseComponents/card";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getBGColor, getDateFormat, getTextColor } from "../../../utils/utils";
import EmptyStates from "../emptyStates";

type OnTrackPatientsListProps = {
  title?: string;
  Icon?: any;
  count?: number;
  list: any[];
  onPress: any;
  searchEnabled: boolean;
  searchText: string;
  emptyStateTitle: string;
  emptyStateMssage: string;
  emptyIcon: any;
};

const OnTrackPatientsList = ({
  title,
  Icon,
  count,
  list,
  onPress,
  searchEnabled,
  searchText,
  emptyStateTitle,
  emptyStateMssage,
  emptyIcon,
}: OnTrackPatientsListProps) => {
  const renderItems = ({ item }: any) => {
    const {
      PatientFirstName,
      PatientLastName,
      IntakeSurgeryDate,
      EpisodeName,
      IntakeStatus,
      TrackStatus,
      NavigatorName,
    } = item;
    return (
      <Card
        onpress={() => onPress(item)}
        style={styles.card as ViewStyle}
        testID={"episodeOnTrackCard"}
      >
        <View style={styles.detailsContainer}>
          <EpisodeTabPatientDetails
            searchText={searchText}
            navigatorName={NavigatorName}
            name={`${PatientFirstName} ${PatientLastName}`}
            problem={EpisodeName}
            date={`Procedure Date: ${getDateFormat(IntakeSurgeryDate)}`}
          />
        </View>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.statusBadge,
              searchEnabled && getBGColor(TrackStatus),
            ]}
          >
            <AppText
              style={[
                styles.status,
                searchEnabled && getTextColor(TrackStatus),
              ]}
            >
              {searchEnabled ? TrackStatus : IntakeStatus}
            </AppText>
          </View>
          <AntDesign style={styles.icon} name={"arrowright"} />
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      {list && list.length > 0 ? (
        <>
          {!searchEnabled && (
            <TitleIconCount
              style={styles.titleCount as ViewStyle}
              title={title}
              Icon={Icon}
              count={count}
            />
          )}
          <FlatList data={list} renderItem={renderItems} />
        </>
      ) : (
        <EmptyStates
          style={{ marginLeft: 0, marginRight: 0 }}
          Icon={emptyIcon}
          title={emptyStateTitle}
          message={emptyStateMssage}
        />
      )}
    </View>
  );
};

export default OnTrackPatientsList;
