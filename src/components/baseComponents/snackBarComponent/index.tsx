import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../appText";
import { langVar, translate } from "../../../enums";
import { CloseWhiteIcon } from "../../../utils/imagePaths";
import AppButton from "../appButton";

type props = {
  onClose: any;
  style?: ViewStyle;
};

const SnackBarComponent = ({ onClose, style }: props) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.errorLabel}>
        {translate.t(langVar.usrPwdIncorrect)}
      </AppText>
      <AppButton onPress={onClose} style={styles.close as ViewStyle}>
        <CloseWhiteIcon />
      </AppButton>
    </View>
  );
};

export default SnackBarComponent;
