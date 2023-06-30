import { View, Modal, ViewStyle, Dimensions, Image } from "react-native";
import React from "react";
import {
  CloseWhiteIcon,
  ShadowtopIcon,
  UploadIcon,
} from "../../../utils/imagePaths";
import ImageZoom from "react-native-image-pan-zoom";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { mediaTypes } from "../../../enums/constants";
import { langVar, themes, translate } from "../../../enums";
import FastImage from "react-native-fast-image";
import { isEqualIgnoreCase } from "../../../utils/utils";

type PreviewMediaProps = {
  data: {
    type: mediaTypes.IMAGE;
    uri: string;
    isUploading?: boolean;
  };
  onClose: any;
  onClickUpload: any;
};

const widnowWidth = Dimensions.get("window").width;
const widnowHeight = Dimensions.get("window").height;
const PreviewMedia = ({ data, onClose, onClickUpload }: PreviewMediaProps) => {
  const { type, uri, isUploading } = data;
  return (
    <Modal visible={uri.length > 0} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <ShadowtopIcon style={{ position: "absolute", zIndex: 3 }} />
        {isEqualIgnoreCase(type, mediaTypes.IMAGE) && (
          <>
            <View style={{ position: "absolute", zIndex: 3 }}>
              <AppButton
                style={styles.closeIcon as ViewStyle}
                onPress={onClose}
              >
                <CloseWhiteIcon />
              </AppButton>
            </View>
            <ImageZoom
              style={{ backgroundColor: themes.Black }}
              cropWidth={widnowWidth}
              cropHeight={widnowHeight}
              imageWidth={widnowWidth}
              imageHeight={widnowHeight}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode={FastImage.resizeMode.contain}
                source={{ uri: uri }}
              />
            </ImageZoom>

            {isUploading && (
              <AppButton
                style={styles.uploadBtn as ViewStyle}
                onPress={() => onClickUpload(uri)}
              >
                <UploadIcon />
                <AppText style={styles.sendLabel}>
                  {translate.t(langVar.send)}
                </AppText>
              </AppButton>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

export default PreviewMedia;

PreviewMedia.defaultProps = {
  onClose: () => {},
};
