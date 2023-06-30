import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ContainerView,
  Underline,
  useAppDispatch,
  useAppSelector,
} from "../../components";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import NotificationActions from "../../components/blockComponents/notificationActionButton";
import NotificationationList from "../../components/blockComponents/notificationList";
import { langVar, screenNames, translate } from "../../enums";
import { NOTIFICATIONTYPE } from "../../enums/constants";
import { fetchNotification } from "../../redux/apis/fetchNotification";
import {
  clearAllNotification,
  markAllAsRead,
  removeNotification,
} from "../../redux/slicers/notificationSlice";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
//import { NotificationsData } from "../../utils/jsonData";
import { confirmBox } from "../../utils/utils";
import { formatNotyResponse } from "./helper";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.NOTIFICATIONS>;

const NotificationScreen = ({ navigation }: Props) => {
  const [NotificationsData, setNotificationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { notyDetails, notyLoading } = useAppSelector(
    (state) => state.notification
  );
  const getHeaderName = () => {
    return NotificationsData.length > 0
      ? `Notifications(${NotificationsData.length})`
      : `Notifications`;
  };

  const onClearAll = () => {
    confirmBox({
      desc: translate.t(langVar.clearAllNotyDialogMessage),
      onConfirm: () => dispatch(clearAllNotification()),
    });
  };
  const onMarkAllRead = () => {
    confirmBox({
      desc: translate.t(langVar.markAllReadNotyDialogMessage),
      onConfirm: () => dispatch(markAllAsRead()),
    });
  };

  useEffect(() => {
    if (notyDetails && notyDetails.notificationDetails) {
      setNotificationData(formatNotyResponse(notyDetails.notificationDetails));
    }
  }, [notyDetails]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    dispatch(fetchNotification(1));
    setLoading(false);
  };

  const onNotificationClick = (item: any) => {
    if (item.type === NOTIFICATIONTYPE.message) {
      navigation.navigate(screenNames.CHAT, {
        conversionName: "Dr. Mukthahar, Priyanka",
      });
    } else if (item.type === NOTIFICATIONTYPE.approveTOC) {
      navigation.navigate(screenNames.TOCDETAILS as any);
    } else {
      navigation.navigate(screenNames.TOCSLIST as any);
    }
  };
  const onClearNotification = (item: any) => {
    dispatch(removeNotification(item.id));
  };

  return (
    <ContainerView
      isBackRequired
      hideStatusSpacer
      headerName={getHeaderName()}
      style={styles.container}
      isScrollEnable={NotificationsData.length !== 0}
      loading={notyLoading || loading}
    >
      {NotificationsData.length > 0 && (
        <NotificationActions
          onPressClearAll={onClearAll}
          onPressMarkAllRead={onMarkAllRead}
        />
      )}
      <Underline style={styles.underline} />

      <NotFoundOrError
        type={"noNotifications"}
        enableIcon={NotificationsData.length === 0}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {NotificationsData && NotificationsData.length > 0 && (
        <NotificationationList
          data={NotificationsData}
          onNotificationClick={onNotificationClick}
          onClearNotification={onClearNotification}
        />
      )}
    </ContainerView>
  );
};

export default NotificationScreen;
