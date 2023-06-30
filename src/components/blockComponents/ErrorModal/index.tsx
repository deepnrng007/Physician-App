import React from "react";
import { Modal, View } from "react-native";
import { ErrorMessageIcon } from "../../../utils/imagePaths";
import AppText from "../../baseComponents/appText";
import LoginButton from "../../baseComponents/loginButton";

import { styles } from "./styles";

type props = {
  isVisible: boolean;
  onPress: any;
  currentContactName?: string;
};

const ErrorModal = ({ isVisible, onPress, currentContactName }: props) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <View style={styles.parentView}>
        <View style={styles.activityIndicatorWrapper}>
          <ErrorMessageIcon height={83} width={83} />
          <AppText style={styles.erroMessage}>
            Some error occured while calling
          </AppText>
          <AppText style={styles.username}>
            {currentContactName ? currentContactName : ""}
          </AppText>
          <LoginButton
            onPress={onPress}
            enable={true}
            label={"OK"}
            removeIcon
            style={{ width: "100%", height: 50 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

ErrorModal.defaultProps = {
  isVisible: true,
};
