import Config from "react-native-config";
import { getRequest, postRequest } from "../connectivity/axiosClient";
import {
  CONVERSATION_COUNT_URL,
  FEATUREFLAG_URL,
  NOTIFICATION_BINDING,
  TERMSANDCONDITION_URL,
  UNBINDNOTIFICATIONS,
} from "../connectivity/endpoints";
import { Client } from "@twilio/conversations";
import { global } from "../global";
import logger from "../utils/logger";
import { isAndroid } from "../utils/utils";
import {
  encriptedStorageKeys,
  responseStatus,
  USERTYPE,
} from "../enums/constants";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorageString,
} from "../utils/encryptedStorage";

export const getConversationCount = async (userId: string) => {
  const res = await getRequest(
    `${CONVERSATION_COUNT_URL}?userID=${userId}`,
    Config.MESSAGINGURL as any
  );
  return res.data;
};

export const updateTermsAndCondition = async (userID: string) => {
  const res = await postRequest(
    `${TERMSANDCONDITION_URL}`,
    { userID },
    Config.RESET_PASSWORDURL as any
  );
  return res.data;
};

export const setTwilioNoticationBind = async (emailID: string) => {
  logger.log("BINDINGSIDBINDINGSID :", global.BINDINGSID);
  if (!global.BINDINGSID) {
    const params = {
      emailID,
      deviceToken: global.FCM_TOKEN,
      deviceType: isAndroid() ? "android" : "ios",
      userType: USERTYPE,
    };
    const res: any = await postRequest(
      `${NOTIFICATION_BINDING}`,
      params,
      Config.MESSAGINGURL as any
    );
    logger.log("setTwilioNoticationBind :", res.data, params);
    if (res.data && res.data.response === responseStatus) {
      await setEncryptedStorageString(
        encriptedStorageKeys.BINDINGSID,
        res.data.bindingSid
      );
      global.BINDINGSID = res.data.bindingSid;
      return res.data;
    } else {
      return false;
    }
  }
};

export const getFeatureflag = async () => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const resp = await getRequest(
      `${FEATUREFLAG_URL}${"pushnotification"}`,
      Config.GENERALURL,
      accessToken
    );
    logger.log("featureflagResponse", resp);
    return resp.data;
  } catch (e) {
    logger.log("featureflagerror:", e);
    return false;
  }
};

export const unBindTwilioNotication = async () => {
  try {
    const bindingSid = await getEncryptedStorage(
      encriptedStorageKeys.BINDINGSID
    );
    logger.log("bindingSidbindingSid :", bindingSid);
    if (bindingSid) {
      const params = {
        bindingSid,
        userType: USERTYPE,
      };
      const res = await postRequest(
        `${UNBINDNOTIFICATIONS}`,
        params,
        Config.MESSAGINGURL as any
      );
      logger.log("unBindTwilioNotication :", res.data);
      removeEncryptedStorage(encriptedStorageKeys.BINDINGSID);
      global.BINDINGSID = null;
      return res.data;
    } else return false;
  } catch (e) {
    logger.log("UnBindTwilioNotication error: ", e);
    return false;
  }
};

export const setTwilioClient = (msgAccessToken: string) => {
  try {
    const client = new Client(msgAccessToken);
    global.TWILIOCLIENT = client as any;
    logger.log("registration Done");
  } catch (e) {
    logger.log("error", e);
  }
};
