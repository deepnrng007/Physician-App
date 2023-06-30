import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../../baseComponents/appText";
import Card from "../../baseComponents/card";
import { HorizontalFormListProps, renderItemProps } from "./types";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import TitleIconCount from "../titleIconCount";
import { PendingTocsIcon } from "../../../utils/imagePaths";
import { screenNames } from "../../../enums";
import NotFound from "../../baseComponents/notFound";
import EmptyStates from "../emptyStates";

const HorizontalFormList = ({
  title,
  list,
  style,
  Icon,
  count,
  emptyStateTitle,
  emptyStateMssage,
  onPress,
  searchEnabled,
  emptyIcon,
  testID,
}: HorizontalFormListProps) => {
  const renderItem = ({ item }: renderItemProps) => {
    const { patientName, problem, date, navigatorName } = item;
    return (
      <Card
        testID={testID}
        onpress={() => onPress({ ...item, totalCount: count })}
        style={styles.card as ViewStyle}
      >
        <View style={styles.detailsContainer}>
          <>
            {navigatorName && (
              <AppText numberOfLines={1} style={styles.navigatorName}>
                {navigatorName}
              </AppText>
            )}
            <AppText numberOfLines={1} style={styles.name}>
              {patientName}
            </AppText>
            <AppText numberOfLines={1} style={styles.problem}>
              {problem}
            </AppText>
            <AppText numberOfLines={1} style={styles.date}>
              {date}
            </AppText>
          </>
        </View>
        <View>
          <View style={styles.iconContainer}>
            <AntDesign name={"arrowright"} style={styles.icon} />
          </View>
        </View>
      </Card>
    );
  };

  const renderUI = () => {
    if (list.length > 0) {
      return (
        <>
          <View style={styles.titleContainer}>
            <TitleIconCount title={title} Icon={Icon} count={count} />
          </View>
          <FlatList
            horizontal
            scrollEnabled
            data={list}
            renderItem={renderItem}
          />
        </>
      );
    } else if (searchEnabled) {
      return <NotFound />;
    } else {
      return (
        <EmptyStates
          Icon={emptyIcon}
          title={emptyStateTitle}
          message={emptyStateMssage}
        />
      );
    }
  };

  return <View style={[style]}>{renderUI()}</View>;
};

export default HorizontalFormList;

HorizontalFormList.defaultProps = {
  title: "",
  list: [],
  style: {},
  Icon: <PendingTocsIcon />,
  EmptyStateIcon: <PendingTocsIcon />,
  screenName: screenNames.HOME,
  searchEnabled: false,
};
