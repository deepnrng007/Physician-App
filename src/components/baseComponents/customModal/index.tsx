import { View, Modal, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppButton from "../appButton";

type props = {
  visible: boolean;
  children: any;
  onClose: any;
  position?: "bottom" | "center";
  customBoxStyle?: ViewStyle;
};

const CustomModal = ({
  visible,
  children,
  onClose,
  position = "center",
  customBoxStyle,
}: props) => {
  const positionStyle = () => {
    if (position === "bottom") return styles.bottomStyle;
    else return {};
  };
  const boxStyle = () => {
    if (position === "bottom") return styles.bottomBox;
    else return {};
  };
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <AppButton
        onPress={onClose}
        style={[styles.container, positionStyle()] as ViewStyle}
      >
        <AppButton style={[styles.box, boxStyle(), customBoxStyle] as any}>
          {children}
        </AppButton>
      </AppButton>
    </Modal>
  );
};

export default CustomModal;
