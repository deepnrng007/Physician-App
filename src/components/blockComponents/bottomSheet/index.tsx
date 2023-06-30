import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { AppButton, AppText } from "../..";
import { langVar, translate } from "../../../enums";
import { Call, MessageIcon } from "../../../utils/imagePaths";
import { styles } from "./styles";
import { bottomSheetProps } from "./types";

const BottomSheet = (props: bottomSheetProps) => {
  const {
    currentContact,
    refRBSheet,
    onPressCall,
    onPressMessage,
    isCallDisable,
  } = props;
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressBack={true}
      customStyles={{
        wrapper: styles.wrapper,
        container: styles.container,
      }}
    >
      <View style={styles.bottomSheetView}>
        <View style={styles.textView}>
          <AppText style={styles.name}>
            {currentContact.firstName} {currentContact.lastName}
          </AppText>
          <AppText style={styles.contactType}>
            {currentContact.description}
          </AppText>
        </View>
        <View style={styles.buttonsView}>
          <AppButton style={styles.messageButton} onPress={onPressMessage}>
            <MessageIcon />
            <AppText style={styles.messageButtonText}>
              {" "}
              {translate.t(langVar.message)}
            </AppText>
          </AppButton>
          <AppButton
            style={styles.callButton}
            onPress={onPressCall}
            disabledStyle={{ ...styles.callButton, opacity: 0.4 }}
            isDisabled={isCallDisable}
          >
            <Call />
            <AppText style={styles.callText}>
              {" "}
              {translate.t(langVar.call)}
            </AppText>
          </AppButton>
        </View>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
