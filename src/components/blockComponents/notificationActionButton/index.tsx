import React from "react";
import AppButton from "../../baseComponents/appButton";
import { styles } from "./styles";

type Props = {
  onPressClearAll: () => void;
  onPressMarkAllRead: () => void;
};
const NotificationActions = ({
  onPressClearAll,
  onPressMarkAllRead,
}: Props) => {
  return (
    <AppButton style={styles.buttonView}>
      <AppButton
        text="Clear All"
        isUderLined={true}
        textStyle={styles.clearAll}
        onPress={onPressClearAll}
      />

      <AppButton
        text="Mark all as read"
        isUderLined={true}
        textStyle={styles.markAllRead}
        onPress={onPressMarkAllRead}
      />
    </AppButton>
  );
};

export default NotificationActions;
