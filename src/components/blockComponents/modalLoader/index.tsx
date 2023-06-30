import React from "react";
import { ActivityIndicator, Modal, View, ViewStyle } from "react-native";
import { langVar } from "../../../enums";
import translate from "../../../enums/languages/translate";
import { themes } from "../../../enums/themes";
import AppText from "../../baseComponents/appText";

import styles from "./styles";

type props = {
  isVisible: boolean;
  text?: string;
  textRequired?: boolean;
};

const ModalLoader = ({ isVisible, text, textRequired = true }: props) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.loaderWrapper}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={themes.White} />
            {textRequired && (
              <AppText style={styles.textStyle}>
                {text ? text : translate.t(langVar.connectingMessage)}
              </AppText>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoader;

ModalLoader.defaultProps = {
  isVisible: true,
};
