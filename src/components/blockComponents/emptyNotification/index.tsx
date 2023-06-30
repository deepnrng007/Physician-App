import React from "react";
import AppButton from "../../baseComponents/appButton";
import { EmptyNotificationIcon } from "../../../utils/imagePaths";
import AppText from "../../baseComponents/appText";
import { styles } from "./styles";
import { langVar, translate } from "../../../enums";

const EmptyNotification = () => {
  return (
    <AppButton style={styles.emptyView}>
      <EmptyNotificationIcon style={styles.icon} />
      <AppText style={styles.text}>
        {translate.t(langVar.noNotificationMessage)}
      </AppText>
    </AppButton>
  );
};

export default EmptyNotification;
