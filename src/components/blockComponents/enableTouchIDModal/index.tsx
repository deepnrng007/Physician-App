import React from "react";
import { View, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { AppButton } from "../..";
import { langVar, themes, translate } from "../../../enums";
import AppText from "../../baseComponents/appText";
import CustomModal from "../../baseComponents/customModal";
import styles from "./styles";

type props = {
  onPressSkip: any;
  onPressEnable: any;
  visible: boolean;
};

const EnableTouchIDModal = ({ visible, onPressSkip, onPressEnable }: props) => {
  return (
    <CustomModal visible={visible} onClose={onPressSkip}>
      <AppText style={styles.title}>{translate.t(langVar.enableBio)}</AppText>
      <AppText style={styles.bioDesc}>
        {translate.t(langVar.enablebioDesc)}
      </AppText>
      <AppButton
        onPress={onPressEnable}
        style={styles.enableButton}
        textStyle={styles.labelButton}
        text={translate.t(langVar.enableTouchFaceID)}
      />
      <AppButton
        onPress={onPressSkip}
        style={[styles.enableButton, styles.skipButton] as ViewStyle}
        textStyle={[styles.labelButton, { color: themes.gray20 }] as ViewStyle}
        text={translate.t(langVar.skip)}
      />
    </CustomModal>
  );
};

export default EnableTouchIDModal;

EnableTouchIDModal.defaultProps = {
  visible: false,
  onPressSkip: () => {},
  onPressEnable: () => {},
};
