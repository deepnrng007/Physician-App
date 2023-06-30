import { FlatList } from "react-native";
import React from "react";
import NotificationItem from "../notifcationItem";

type Props = {
  data: any[];
  onNotificationClick: any;
  onClearNotification: any;
};

const NotificationationList = ({
  data,
  onNotificationClick,
  onClearNotification,
}: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(item) => (
        <NotificationItem
          notificationItem={item.item}
          onNotificationClick={() => onNotificationClick(item.item)}
          onClearNotification={() => onClearNotification(item.item)}
        />
      )}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default NotificationationList;
