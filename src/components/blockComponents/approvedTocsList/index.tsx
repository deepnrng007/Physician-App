import { View, FlatList, ViewStyle, Animated } from "react-native";
import React, { useState } from "react";
import TitleIconCount from "../titleIconCount";
import { langVar, translate } from "../../../enums";
import styles from "./styles";
import Card from "../../baseComponents/card";
import ApprovedTocsCard from "../approvedTocsCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppButton from "../../baseComponents/appButton";
import { scale } from "react-native-size-matters";
import RevisedTocsDetails from "../revisedTocsDetails";
import EmptyStates from "../emptyStates";

export const TocCardItem = ({ item, onPress, searchText }: any) => {
  const animateRevisedList = useState(new Animated.Value(0))[0];
  const [isOpenList, setIsOpenList] = useState(false);
  const [listHeight, setListHeight] = useState(0);
  const [heightShouldLoad, setHeightshouldLoad] = useState(true);

  const setRevisedListHeight = (event: any) => {
    if (heightShouldLoad) {
      const { height } = event.nativeEvent.layout;
      setListHeight(listHeight + height);
    }

    setTimeout(() => {
      setHeightshouldLoad(false);
    }, 1000);
  };

  const animateRevisedListHight = () => {
    if (!isOpenList) {
      Animated.timing(animateRevisedList, {
        toValue: listHeight,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setIsOpenList(!isOpenList);
    } else {
      Animated.timing(animateRevisedList, {
        toValue: 10,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setIsOpenList(!isOpenList);
    }
  };

  const {
    testID,
    patientName,
    problem,
    date,
    details,
    revisedDetails,
    trackStatus,
    navigatorName,
  } = item;
  const isRevised =
    revisedDetails &&
    revisedDetails.revised &&
    revisedDetails.revised.length > 1;
  return (
    <View accessibilityLabel={testID} testID={testID}>
      <Card
        style={
          [
            styles.card,
            { marginBottom: !isRevised || isOpenList ? scale(15) : 0 },
          ] as ViewStyle
        }
        onpress={() => onPress(item)}
      >
        <ApprovedTocsCard
          navigatorName={navigatorName}
          searchText={searchText}
          trackStatus={trackStatus}
          name={patientName}
          problem={problem}
          date={date}
          details={details}
        />
        {isRevised && (
          <Animated.View style={{ height: animateRevisedList }}>
            <RevisedTocsDetails
              getHight={setRevisedListHeight}
              revisedDetails={revisedDetails}
              navigateTo={() => onPress(item)}
            />
          </Animated.View>
        )}
        {isRevised && (
          <AppButton
            onPress={animateRevisedListHight}
            style={styles.arrow as ViewStyle}
          >
            <AntDesign
              name={"down"}
              style={[
                styles.icon,
                {
                  transform: isOpenList
                    ? [{ rotateX: "180deg" }]
                    : [{ rotateX: "0deg" }],
                },
              ]}
            />
          </AppButton>
        )}
      </Card>
      {isRevised && !isOpenList && (
        <>
          <View style={styles.layer1} />
          <View style={styles.layer2} />
        </>
      )}
    </View>
  );
};

type ApprovedTocsListProps = {
  list: any[];
  Icon: any;
  searchEnabled: boolean;
  searchText?: string;
  isTitleVisible: boolean;
  testID?: string;
  onPress: any;
  emptyStateTitle: string;
  emptyStateMssage: string;
  emptyIcon: any;
};

const ApprovedTocsList = ({
  list,
  Icon,
  searchEnabled,
  searchText,
  isTitleVisible,
  testID,
  onPress,
  emptyStateTitle,
  emptyStateMssage,
  emptyIcon,
}: ApprovedTocsListProps) => {
  return (
    <View>
      {list && list.length > 0 ? (
        <>
          {!searchEnabled && isTitleVisible && (
            <TitleIconCount
              Icon={Icon}
              style={styles.titleCount as ViewStyle}
              title={translate.t(langVar.approvedTocs)}
              count={list.length}
            />
          )}
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <TocCardItem
                item={item}
                testID={testID}
                searchText={searchText}
                onPress={onPress}
              />
            )}
          />
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

export default ApprovedTocsList;

ApprovedTocsList.defaultProps = {
  searchEnabled: false,
  searchText: "",
  isTitleVisible: true,
};
