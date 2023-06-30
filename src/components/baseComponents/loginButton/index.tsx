import { ViewStyle } from "react-native";
import React from "react";
import AppButton from "../appButton";
import styles from "./styles";
import { langVar, themes, translate } from "../../../enums";
import { RoundTickIcon } from "../../../utils/imagePaths";
import AppText from "../appText";
import { ActivityIndicator } from "react-native-paper";

type props = {
  onPress: any;
  enable: boolean;
  label: string;
  removeIcon: boolean;
  style?: ViewStyle;
  loading?: boolean;
};
const LoginButton = ({
  onPress,
  enable,
  label,
  removeIcon,
  style,
  loading = false,
}: props) => {
  return (
    <AppButton
      onPress={loading ? () => {} : onPress}
      style={
        [
          styles.loginBtn,
          enable && {
            opacity: 1,
            backgroundColor: themes.green,
          },
          style,
        ] as ViewStyle
      }
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {!removeIcon && <RoundTickIcon />}
          <AppText style={styles.loginLabel}>{label}</AppText>
        </>
      )}
    </AppButton>
  );
};

export default LoginButton;

LoginButton.defaultProps = {
  enable: false,
  label: translate.t(langVar.loginIn),
  removeIcon: false,
};
