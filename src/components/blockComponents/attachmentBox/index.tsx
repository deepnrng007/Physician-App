import { View, ViewStyle } from "react-native";
import React from "react";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { attachmentType } from "../../../enums/constants";
import {
  CameraIcon,
  DocumentIcon,
  GallaryIcon,
} from "../../../utils/imagePaths";
import { langVar, themes, translate } from "../../../enums";
import { scale } from "react-native-size-matters";

type AttachmentBoxProps = {
  onPress: (type: string) => void;
  testID?: string;
};

const AttachmentBox = ({ onPress, testID }: AttachmentBoxProps) => {
  return (
    <View testID={testID} accessibilityLabel={testID} style={styles.container}>
      <AppButton
        style={[styles.button, styles.galleryBtn] as ViewStyle}
        onPress={() => onPress(attachmentType.GALLERY)}
      >
        <GallaryIcon />
        <AppText style={[styles.optionLabel, { color: themes.White }]}>
          {translate.t(langVar.gallery)}
        </AppText>
      </AppButton>

      <AppButton
        style={styles.button as ViewStyle}
        onPress={() => onPress(attachmentType.DOCUMENT)}
      >
        <DocumentIcon />
        <AppText style={styles.optionLabel}>
          {translate.t(langVar.documents)}
        </AppText>
      </AppButton>
      <AppButton
        style={[styles.button, { marginBottom: scale(40) }] as ViewStyle}
        onPress={() => onPress(attachmentType.CAMERA)}
      >
        <CameraIcon />
        <AppText style={styles.optionLabel}>
          {translate.t(langVar.camera)}
        </AppText>
      </AppButton>
    </View>
  );
};

export default AttachmentBox;
