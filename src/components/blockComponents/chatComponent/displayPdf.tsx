import { Linking, View, ViewStyle } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  CloseBlackIcon,
  DocIcon,
  PdfIcon,
  RetryUpArrow,
} from "../../../utils/imagePaths";
import CircleProgress from "../../baseComponents/circleProgress";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { mediaTypes, responseStatus } from "../../../enums/constants";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import styles from "./styles";
import {
  getBytesToConvert,
  getLocaleTime,
  isBothTypeSame,
} from "../../../utils/utils";
import { fileUploadAPI } from "../../../connectivity/fetchAsync";
import useAppSelector from "../../customHooks/useAppSelector";
import { SENDMESSAGE_URL } from "../../../connectivity/endpoints";
import Config from "react-native-config";
import { ReadIcon, SendingIcon, SentIcon } from "../../../utils/imagePaths";
import { global } from "../../../global";

type DisplayPdfProps = {
  type: mediaTypes.PDF | mediaTypes.DOC;
  fileName: string;
  fileSize: number;
  uri: string;
  uploadingFlag: boolean;
  date: string;
  unreadCount: number;
  index: number;
  userId: string;
  _id: string;
  readCount: number;
};

const DisplayPdf = ({
  type,
  fileName,
  fileSize,
  uploadingFlag,
  uri,
  date,
  unreadCount,
  readCount,
  index,
  _id,
  userId,
}: DisplayPdfProps) => {
  const [showUploading, setShowUploading] = useState(uploadingFlag);
  const [progressBarValue, sertProgressBarValue] = useState(0);
  const [isUploadFailed, setIsUploadFailed] = useState(false);
  const [isSendTickDisplay, setisSendTickDisplay] = useState(!uploadingFlag);
  const [url, setUrl] = useState(uri);
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
    if (uploadingFlag) {
      uploadFile(uri);
    }
  }, [uploadingFlag]);

  const getXmlRef = (ref: XMLHttpRequest) => {
    xmlRef.current = ref;
  };

  const cancelUpload = () => {
    if (xmlRef.current) xmlRef.current.abort();
  };

  const uploadFile = async (uri: string) => {
    setIsUploadFailed(false);
    fileUploadAPI(
      {
        fileName,
        fileType: type,
        fileSize,
        fileUri: uri,
        progressCallback: handlerProgress,
        onComplete: onCompleted,
        errorCallback: errorCallback,
        url: `${Config.MESSAGINGURL}${SENDMESSAGE_URL}`,
        conversationID,
        conversationTwilioID,
        messageOwnerEmailAddress: ownereMail,
        messageOwnerUserID: userOwnerId,
      },
      getXmlRef
    );
  };

  const errorCallback = () => {
    setIsUploadFailed(true);
    sertProgressBarValue(0);
  };

  const onCompleted = (res: string) => {
    const response = typeof res === "string" ? JSON.parse(res) : res;
    if (response?.response === responseStatus) {
      setUrl(response.attachmentUploadURL);
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

  const handlerProgress = (event: any) => {
    const percentage = Math.round((event.loaded * 100) / event.total);
    sertProgressBarValue(percentage);
  };

  const openDocPDF = () => {
    Linking.openURL(url);
  };

  const getMessageStatus = () => {
    if (!isSendTickDisplay) return <SendingIcon />;
    else if (isSendTickDisplay && readCount && unreadCount <= index)
      return <ReadIcon />;
    else if (isSendTickDisplay) return <SentIcon />;
  };
  return (
    <>
      <AppButton
        style={styles.documentContainer as ViewStyle}
        onPress={openDocPDF}
      >
        {isBothTypeSame(type, mediaTypes.PDF) ? (
          <PdfIcon style={{ flex: 10 }} />
        ) : (
          <DocIcon style={{ flex: 10 }} />
        )}
        <View
          style={{
            flex: 75,
            marginLeft: scale(5),
          }}
        >
          <AppText style={styles.fileName} numberOfLines={1}>
            {fileName}
          </AppText>
          <AppText style={styles.fileSize}>
            {isUploadFailed
              ? "Retry"
              : getBytesToConvert(fileSize).valueWithType}
          </AppText>
        </View>
        {showUploading && (
          <AppButton onPress={() => uploadFile(uri)}>
            <CircleProgress
              initialValue={0}
              radius={scale(20)}
              activeStrokeWidth={4}
              inActiveStrokeWidth={4}
              value={progressBarValue}
              circleBackgroundColor={"transparent"}
              activeStrokeColor={themes.gray20}
              inActiveStrokeColor={themes.gray20Opacity40}
            >
              {isUploadFailed ? (
                <AppButton onPress={() => uploadFile(uri)}>
                  <RetryUpArrow />
                </AppButton>
              ) : (
                <AppButton onPress={cancelUpload}>
                  <CloseBlackIcon />
                </AppButton>
              )}
            </CircleProgress>
          </AppButton>
        )}
      </AppButton>
      <View style={styles.dateTick}>
        <AppText style={styles.dates}>{getLocaleTime(date, "hh:mm a")}</AppText>
        {userId === _id && getMessageStatus()}
      </View>
    </>
  );
};

export default DisplayPdf;

DisplayPdf.defaultProps = {
  uploadingFlag: false,
};
