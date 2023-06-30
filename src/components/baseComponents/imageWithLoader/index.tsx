import { View } from "react-native";
import FastImage from "react-native-fast-image";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import styles from "./styles";
import AppButton from "../appButton";
import CircleProgress from "../circleProgress";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import AppText from "../appText";
import {
  CloseWhiteIcon,
  ReadIcon,
  RetryIcon,
  SendingIcon,
  SentIcon,
} from "../../../utils/imagePaths";
import { fileUploadAPI } from "../../../connectivity/fetchAsync";
import {
  getBytesToConvert,
  getLocaleTime,
  getUploadedPartwithPercentage,
} from "../../../utils/utils";
import useAppSelector from "../../customHooks/useAppSelector";
import { SENDMESSAGE_URL } from "../../../connectivity/endpoints";
import { responseStatus } from "../../../enums/constants";
import Config from "react-native-config";
import { global } from "../../../global";

type ImageWithLoaderProps = {
  uri: string;
  isUploading?: boolean;
  fileSize?: number;
  fileName?: string;
  fileType?: string;
  date?: string;
  unreadCount: number;
  index: number;
  userId: string;
  _id: string;
  readCount: number;
};

const ImageWithLoader = ({
  uri,
  isUploading,
  fileSize,
  fileName,
  fileType,
  date,
  unreadCount,
  readCount,
  index,
  _id,
  userId,
}: ImageWithLoaderProps) => {
  const fileTotalSize = getBytesToConvert(fileSize).valueWithType;
  const [loading, setLoading] = useState(true);
  const [showUploading, setShowUploading] = useState(isUploading);
  const [progressBarValue, sertProgressBarValue] = useState(0);
  const [uploadingData, setUploadingData] = useState(0);
  const [isUploadFailed, setIsUploadFailed] = useState(false);
  const [isSendTickDisplay, setisSendTickDisplay] = useState(!isUploading);
  const xmlRef = useRef<any>();
  const { loginData, chatIdsData } = useAppSelector((state) => {
    return {
      loginData: state.login,
      chatIdsData: state.chatIds,
    };
  });
  const {
    loginDetails: { userOwnerId, ownereMail },
  } = loginData;
  const {
    idsDetails: { conversationID, conversationTwilioID },
  } = chatIdsData;

  useEffect(() => {
    if (isUploading) {
      uploadFile(uri);
    }
  }, [isUploading]);
  const uploadFile = async (uri: string) => {
    setIsUploadFailed(false);
    fileUploadAPI(
      {
        fileName,
        fileType,
        fileSize,
        fileUri: uri,
        progressCallback: handlerProgress,
        onComplete: onCompleted,
        errorCallback: errorCallback,
        url: `${Config.MESSAGINGURL}${SENDMESSAGE_URL}`,

        conversationID: conversationID,
        conversationTwilioID,
        messageOwnerEmailAddress: ownereMail,
        messageOwnerUserID: userOwnerId,
      },
      getXmlRef
    );
  };

  const getXmlRef = (ref: XMLHttpRequest) => {
    xmlRef.current = ref;
  };

  const cancelUpload = () => {
    if (xmlRef.current) xmlRef.current.abort();
  };

  const handlerProgress = (event: any) => {
    const percentage = Math.round((event.loaded * 100) / event.total);
    if (fileSize)
      setUploadingData(getUploadedPartwithPercentage(percentage, fileSize));
    sertProgressBarValue(percentage);
  };
  const errorCallback = () => {
    setIsUploadFailed(true);
  };

  const onCompleted = (res: any) => {
    const response = typeof res === "string" ? JSON.parse(res) : res;
    if (response?.response === responseStatus) {
      sertProgressBarValue(100);
      setShowUploading(false);
      setTimeout(() => {
        if (response?.response === responseStatus) {
          setisSendTickDisplay(true);
        }
      }, 1000);
    } else {
      errorCallback();
    }
  };

  const getMessageStatus = () => {
    if (!isSendTickDisplay) return <SendingIcon />;
    else if (isSendTickDisplay && readCount && unreadCount <= index)
      return <ReadIcon />;
    else if (isSendTickDisplay) return <SentIcon />;
  };

  return (
    <>
      <View style={styles.image}>
        {loading && (
          <View style={styles.activity}>
            <ActivityIndicator color={themes.green} />
          </View>
        )}
        <FastImage
          source={{ uri: uri, priority: FastImage.priority.high }}
          onLoadEnd={() => setLoading(false)}
          style={styles.image}
          resizeMode={"cover"}
        >
          <View
            style={[
              styles.overlay,
              showUploading && { backgroundColor: themes.Black },
            ]}
          />
        </FastImage>
        {showUploading && (
          <View style={styles.uploadView}>
            <AppButton onPress={() => isUploadFailed && uploadFile(uri)}>
              {isUploadFailed ? (
                <RetryIcon />
              ) : (
                <CircleProgress
                  initialValue={0}
                  radius={scale(20)}
                  activeStrokeWidth={4}
                  inActiveStrokeWidth={4}
                  value={progressBarValue}
                  circleBackgroundColor={"transparent"}
                  activeStrokeColor={themes.White}
                  inActiveStrokeColor={themes.transparent50}
                >
                  <AppButton onPress={cancelUpload}>
                    <CloseWhiteIcon />
                  </AppButton>
                </CircleProgress>
              )}
            </AppButton>
            {!isUploadFailed && (
              <AppText
                style={{
                  marginLeft: scale(10),
                  fontSize: scale(14),
                  color: themes.White,
                }}
              >{`${uploadingData.toFixed(2)}/${fileTotalSize}`}</AppText>
            )}
          </View>
        )}
      </View>
      <View style={styles.dateTick}>
        {date && (
          <AppText style={styles.dates}>
            {getLocaleTime(date, "hh:mm a")}
          </AppText>
        )}
        {userId === _id && getMessageStatus()}
      </View>
    </>
  );
};

export default ImageWithLoader;
