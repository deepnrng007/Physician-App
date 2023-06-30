import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import {
  ACCESSTOKEN_URL,
  GETCONVERSATION_URL,
  SENDMESSAGE_URL,
} from "../../connectivity/endpoints";
import { fetchAsync } from "../../connectivity/fetchAsync";
import { responseStatus } from "../../enums/constants";
import { global } from "../../global";

export const fetchAccessToken = async (email: string) => {
  const response = await fetchAsync(
    `${Config.MESSAGINGURL}${ACCESSTOKEN_URL}?emailAddress=${email}`
  );
  if (response?.response === responseStatus) {
    global.ACCESS_TOKEN = response?.accessToken;
    return {
      msgAccessToken: response?.accessToken,
    };
  } else return false;
};

type sendMessageProps = {
  conversationID: number;
  conversationTwilioID: string;
  messageBody?: string | null;
  messageType: string;
  messageOwnerEmailAddress: string;
  messageOwnerUserID: number;
};
export const sendMessage = async (params: sendMessageProps) => {
  const data = new FormData();
  data.append("conversationID", params.conversationID);
  data.append("messageBody", params.messageBody);
  data.append("conversationTwilioID", params.conversationTwilioID);
  data.append("messageType", params.messageType);
  data.append("messageOwnerEmailAddress", params.messageOwnerEmailAddress);
  data.append("messageOwnerUserID", params.messageOwnerUserID);

  const res = await fetchAsync(`${Config.MESSAGINGURL}${SENDMESSAGE_URL}`, {
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data,
  });
  return res;
};

export const getMessages = async (params: any) => {
  const res = await postRequest(
    GETCONVERSATION_URL,
    params,
    Config.MESSAGINGURL as any
  );
  if (res?.data?.response === responseStatus) {
    return res?.data?.messageDetails;
  } else return [];
};
