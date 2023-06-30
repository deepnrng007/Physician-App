import { View, Modal, ViewStyle } from "react-native";
import React, { useRef, useState } from "react";
import { RNCamera } from "react-native-camera";
import AppButton from "../appButton";
import styles from "./style";
import {
  CloseWhiteIcon,
  FlashoffIcon,
  FlashonIcon,
  RecordStartIcon,
  SwitchCameraIcon,
} from "../../../utils/imagePaths";
import { langVar, translate } from "../../../enums";
import PreviewMedia from "../../blockComponents/previewMedia";

type CameraComponentProps = {
  visible: boolean;
  onCaptured: any;
  onCloseCamera: any;
  viewURL: any;
  onClosePreviewMedia: any;
  onClickUpload: any;
};

const CameraComponent = ({
  visible,
  onCaptured,
  onCloseCamera,
  viewURL,
  onClosePreviewMedia,
  onClickUpload,
}: CameraComponentProps) => {
  const [isFontCamera, setIsFontCamera] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const camera = useRef<any>();

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5 };
      const data = await camera.current.takePictureAsync(options);
      if (data.uri) onCaptured(data.uri);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onCloseCamera}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <PreviewMedia
        data={viewURL}
        onClose={onClosePreviewMedia}
        onClickUpload={onClickUpload}
      />
      <View style={styles.container}>
        <RNCamera
          ref={(ref: any) => {
            camera.current = ref;
          }}
          captureAudio
          style={styles.preview}
          flashMode={
            isFlashOn
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          type={
            isFontCamera
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          androidCameraPermissionOptions={{
            title: translate.t(langVar.permCameraTitle),
            message: translate.t(langVar.permCameraMessage),
            buttonPositive: translate.t(langVar.ok),
            buttonNegative: translate.t(langVar.cancel),
          }}
        >
          <View style={{ flex: 1 }}>
            <AppButton
              style={styles.closeIcon as ViewStyle}
              onPress={onCloseCamera}
            >
              <CloseWhiteIcon />
            </AppButton>
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <AppButton onPress={() => setIsFlashOn(!isFlashOn)}>
                  {isFlashOn ? <FlashonIcon /> : <FlashoffIcon />}
                </AppButton>
                <AppButton onPress={takePicture}>
                  <RecordStartIcon />
                </AppButton>
                <AppButton onPress={() => setIsFontCamera(!isFontCamera)}>
                  <SwitchCameraIcon />
                </AppButton>
              </View>
            </View>
          </View>
        </RNCamera>
      </View>
    </Modal>
  );
};

export default CameraComponent;

CameraComponent.defaultProps = {
  visible: false,
  onVideRecorded: () => {},
  onCaptured: () => {},
};
