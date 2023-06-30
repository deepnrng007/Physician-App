import { Modal, Dimensions, ViewStyle, Animated, View } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import AppButton from "../../baseComponents/appButton";
import styles from "./styles";
import { scale } from "react-native-size-matters";

type RightSidePanelProps = {
  visible: boolean;
  onDismiss: () => void;
  onPanelCompleteOpened?: () => void;
  children: ReactNode;
};

const deviceWidth = Dimensions.get("window").width;

const RightSidePanel = ({
  children,
  visible,
  onDismiss,
  onPanelCompleteOpened,
}: RightSidePanelProps) => {
  const animationMarginRight = useState(
    new Animated.Value(-scale(deviceWidth - 125))
  )[0];

  useEffect(() => {
    Animated.timing(animationMarginRight, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => onPanelCompleteOpened);
  });

  const closePanel = () => {
    Animated.timing(animationMarginRight, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => onDismiss());
  };

  return (
    <Modal transparent visible={visible} onRequestClose={closePanel}>
      <Animated.View
        style={[
          styles.panelContainer,
          {
            marginRight: animationMarginRight,
          },
        ]}
      >
        <AppButton
          onPress={onDismiss}
          style={styles.container as ViewStyle}
        ></AppButton>

        <View style={styles.rightPanel as ViewStyle}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

export default RightSidePanel;

RightSidePanel.defaultProps = {
  visible: false,
  onDismiss: () => {},
  onPanelCompleteOpened: () => {},
};
