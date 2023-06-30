import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { AppButton, AppText } from "../../../";
import { langVar, translate } from "../../../../enums";
import { styles } from "./styles";
import { bottomSheetProps } from "./type";

const ToCApproveBottomSheet = (props: bottomSheetProps) => {
  const { onPressApprove, onPressCancel, refRBSheet } = props;
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
        <AppText numberOfLines={2} style={styles.alertText}>
          {translate.t(langVar.approveTOCDialogMessage)}
        </AppText>
        <View style={styles.buttonView}>
          <AppButton
            text="Go Back"
            style={styles.cancelButton}
            textStyle={styles.buttonText}
            onPress={onPressCancel}
          />
          <AppButton
            text="Approve"
            style={styles.approveButton}
            textStyle={styles.approveText}
            onPress={onPressApprove}
          />
        </View>
      </View>
    </RBSheet>
  );
};

export default ToCApproveBottomSheet;
