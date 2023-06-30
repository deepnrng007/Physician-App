import { View, FlatList, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import TitleIconCount from "../titleIconCount";
import { langVar, translate } from "../../../enums";
import { MessageColorIcon } from "../../../utils/imagePaths";
import { LastFewMessagesProps } from "./types";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import EmptyStates from "../emptyStates";
import { getLocaleTimeNow } from "../../../utils/utils";

const LastFewMessages = ({
  style,
  list,
  emptyStateTitle,
  emptyStateMssage,
  emptyIcon,
  onPress,
  accessibilityLabel,
  testID,
  limit,
  navigateToMessageList,
  countValue,
}: LastFewMessagesProps) => {
  const renderItems = ({ item }: any) => {
    const { name, lastMessageContent, lastMessageDateTime } = item;
    return (
      <AppButton
        onPress={() => onPress(item)}
        style={styles.messageContainer as ViewStyle}
      >
        <View
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          style={styles.messageDetails}
        >
          <View style={styles.nameDate}>
            <AppText numberOfLines={1} style={styles.name}>
              {name}
            </AppText>
            <AppText style={styles.date}>
              {getLocaleTimeNow(lastMessageDateTime)}
            </AppText>
          </View>
          <AppText style={styles.message} numberOfLines={1}>
            {lastMessageContent}
          </AppText>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name={"arrowright"} style={styles.icon} />
        </View>
      </AppButton>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {list && list.length > 0 ? (
        <>
          <View style={styles.nameDate}>
            <TitleIconCount
              title={translate.t(langVar.Messages)}
              count={countValue}
              Icon={MessageColorIcon}
              style={styles.titleCount as ViewStyle}
            />
            <AppButton onPress={navigateToMessageList}>
              <AppText style={styles.viewAll}>
                {translate.t(langVar.viewAll)}
              </AppText>
            </AppButton>
          </View>
          <View style={styles.messageListContainer}>
            <FlatList data={list.slice(0, limit)} renderItem={renderItems} />
          </View>
        </>
      ) : (
        <EmptyStates
          Icon={emptyIcon}
          title={emptyStateTitle}
          message={emptyStateMssage}
        />
      )}
    </View>
  );
};

export default LastFewMessages;
