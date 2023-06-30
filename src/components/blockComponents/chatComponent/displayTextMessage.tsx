import React, { useEffect, useState } from "react";
import AppText from "../../baseComponents/appText";
import useAppSelector from "../../customHooks/useAppSelector";
import { mediaTypes, responseStatus } from "../../../enums/constants";
import { sendMessage } from "../../../screens/messages/helper";
import styles from "./styles";
import { getLocaleTime } from "../../../utils/utils";
import { View, ViewStyle } from "react-native";
import { global } from "../../../global";
import { ReadIcon, SendingIcon, SentIcon } from "../../../utils/imagePaths";

type props = {
  name: string;
  content: string;
  date: string;
  uploadingFlag: boolean;
  unreadCount: number;
  index: number;
  userId: string;
  _id: string;
  readCount: number;
};
const DisplayTextMessage = ({
  content,
  date,
  uploadingFlag,
  unreadCount,
  readCount,
  index,
  _id,
  userId,
}: props) => {
  const [isSendTickDisplay, setisSendTickDisplay] = useState(!uploadingFlag);
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
    idsDetails: { conversationTwilioID, conversationID },
  } = chatIdsData;

  useEffect(() => {
    if (uploadingFlag) {
      sendMessageAPI();
    }
  }, []);

  const sendMessageAPI = async () => {
    const data = {
      conversationTwilioID,
      conversationID,
      messageOwnerEmailAddress: ownereMail,
      messageOwnerUserID: userOwnerId,
      messageType: mediaTypes.TEXT,
      messageBody: content,
    };
    const res = await sendMessage(data);
    setTimeout(() => {
      if (res?.response === responseStatus) {
        setisSendTickDisplay(true);
      }
    }, 1000);
  };

  const getMessageStatus = () => {
    if (!isSendTickDisplay) return <SendingIcon />;
    else if (isSendTickDisplay && readCount && unreadCount <= index)
      return <ReadIcon />;
    else if (isSendTickDisplay) return <SentIcon />;
  };

  return (
    <>
      <AppText highlightUrl linkStyle={styles.message as ViewStyle}>
        {content}
      </AppText>
      <View style={styles.dateTick}>
        <AppText style={styles.dates}>{getLocaleTime(date, "hh:mm a")}</AppText>
        {userId === _id && getMessageStatus()}
      </View>
    </>
  );
};

export default DisplayTextMessage;

DisplayTextMessage.defaultProps = {
  uploadingFlag: false,
};
