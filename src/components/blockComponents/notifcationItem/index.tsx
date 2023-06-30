import React from "react";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { styles } from "./styles";
import {
  ApproveTocStampIcon,
  GreaterThan,
  MessageNotficationIcon,
  TimerNotifcationIcon,
} from "../../../utils/imagePaths";
import { Swipeable } from "react-native-gesture-handler";
import { NOTIFICATIONTYPE } from "../../../enums/constants";
import { View } from "react-native";
import { langVar, translate } from "../../../enums";
import { getLocaleTimeNow } from "../../../utils/utils";

type Props = {
  notificationItem: any;
  onNotificationClick: () => void;
  onClearNotification: any;
};

const NotificationItem = ({
  notificationItem,
  onClearNotification,
  onNotificationClick,
}: Props) => {
  const { id, isRead, type, date, highlightedText, message } = notificationItem;
  const rightSwipeActions = () => {
    return (
      <AppButton
        style={styles().clearView}
        onPress={() => onClearNotification({ id })}
      >
        <AppText style={styles().clear}>{translate.t(langVar.clear)}</AppText>
      </AppButton>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <AppButton style={styles(isRead).mainView} onPress={onNotificationClick}>
        {NOTIFICATIONTYPE.approveTOC === type && (
          <ApproveTocStampIcon style={styles().leftIcon} />
        )}
        {NOTIFICATIONTYPE.message === type && (
          <MessageNotficationIcon style={styles().leftIcon} />
        )}
        {NOTIFICATIONTYPE.offTrackTOC === type && (
          <TimerNotifcationIcon style={styles().leftIcon} />
        )}
        <View style={styles().detailView}>
          <AppText style={styles().time}>{`${getLocaleTimeNow(date)}`}</AppText>
          <AppText
            style={styles().message}
            numberOfLines={2}
            searchKeywords={highlightedText}
            highlightStyle={styles().highlightStyle}
          >
            {message}
          </AppText>
        </View>
        <GreaterThan style={styles().arrow} />
      </AppButton>
    </Swipeable>
  );
};

export default NotificationItem;
