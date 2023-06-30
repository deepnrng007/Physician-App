import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { AppText } from "../..";
import { langVar, translate } from "../../../enums";
import { CheckedGreenCircle } from "../../../utils/imagePaths";
import CustomModal from "../../baseComponents/customModal";
import LoginButton from "../../baseComponents/loginButton";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: any;
  enabled: boolean;
  navigateTo: any;
};
const EnabledTouchIDModal = ({
  visible,
  onClose,
  enabled,
  navigateTo,
}: Props) => {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <CheckedGreenCircle />
        <AppText style={styles.title}>{translate.t(langVar.success)}</AppText>
      </View>
      {enabled ? (
        <AppText style={styles.titleDesc}>
          {translate.t(langVar.successDescEnaled)}
        </AppText>
      ) : (
        <AppText style={styles.titleDesc}>
          {translate.t(langVar.successDescDisabled)}
        </AppText>
      )}

      {enabled && (
        <AppText style={styles.titleDesc}>
          {translate.t(langVar.todiable)}{" "}
          <AppText style={[styles.titleDesc, styles.bold]}>
            {translate.t(langVar.faceAndTouchID)}
          </AppText>{" "}
          <AppText style={styles.titleDesc}>
            {translate.t(langVar.under)}
          </AppText>{" "}
          <AppText style={[styles.titleDesc, styles.bold]}>
            {translate.t(langVar.menu)}
          </AppText>{" "}
          <AppText style={styles.titleDesc}>
            {translate.t(langVar.option)}
          </AppText>
        </AppText>
      )}
      <LoginButton
        style={{ marginTop: scale(15) }}
        onPress={navigateTo}
        label={translate.t(langVar.gotoHome)}
        enable
        removeIcon
      />
    </CustomModal>
  );
};

export default EnabledTouchIDModal;
