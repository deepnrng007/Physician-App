import { Modal, View, ViewStyle } from "react-native";
import React from "react";
import AppButton from "../../../baseComponents/appButton";
import { styles } from "./styles";
import { CheckedGreenCircle } from "../../../../utils/imagePaths";
import { AppText } from "../../..";

type ApproveDialogProps = {
  visible: boolean;
  onClose: any;
  pendingCount: number;
  onApproveNext: any;
  onGoHome: any;
  name: string;
};

const ApproveDialog = ({
  visible,
  onClose,
  pendingCount,
  onApproveNext,
  onGoHome,
  name,
}: ApproveDialogProps) => {
  const isPendingExist = pendingCount > 0;
  return (
    <Modal visible={visible} transparent={true}>
      <AppButton onPress={onClose} style={styles.container as ViewStyle}>
        <View style={styles.dialogView}>
          <CheckedGreenCircle style={styles.checkMarkStyle} />
          <AppText style={styles.alertMessage}>
            You Just Approved <AppText style={styles.name}>{name}’s</AppText>{" "}
            TOC
          </AppText>

          {isPendingExist ? (
            <AppText style={styles.pendingText}>
              {pendingCount} More Pending
            </AppText>
          ) : (
            <AppText style={styles.pendingText}>No Pending TOC</AppText>
          )}

          {isPendingExist ? (
            <AppButton
              style={styles.approveButton}
              textStyle={styles.approveText}
              text="Approve Next TOC"
              onPress={onApproveNext}
            />
          ) : null}

          <AppButton
            style={isPendingExist ? styles.cancelButton : styles.approveButton}
            textStyle={isPendingExist ? styles.cancelText : styles.approveText}
            text="Go to Home"
            onPress={onGoHome}
          />
        </View>
      </AppButton>
    </Modal>
  );
};

export default ApproveDialog;

ApproveDialog.defaultProps = {
  visible: false,
  isPending: true,
  pendingCount: 0,
};
