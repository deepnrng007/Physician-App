import { View, Modal } from "react-native";
import React from "react";
import styles from "./styles";
import Loader from "../loader";
import { themes } from "../../../enums";

const ModalLoader = ({ visible }: any) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <Loader textStyle={{ color: themes.White1 }} loaderColor="white" />
      </View>
    </Modal>
  );
};

export default ModalLoader;
