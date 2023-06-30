import logger from "../utils/logger";
import { checkNetCon, getFileType } from "../utils/utils";

const getRequestConfig = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const fetchAsync = async (
  url: string,
  requestConfig: any = getRequestConfig
) => {
  if (!(await checkNetCon())) return;
  return fetch(url, requestConfig)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      logger.log("error occured :", error);
      return error;
    });
};

type fileUploadProps = {
  url: string | undefined;
  fileUri: string;
  fileType: string | undefined;
  fileName: string | undefined;
  fileSize: number | undefined;
  progressCallback: any;
  onComplete: any;
  errorCallback?: any;
  conversationID: number;
  conversationTwilioID: string;
  messageOwnerEmailAddress: string;
  messageOwnerUserID: number;
};
export const fileUploadAPI = async (
  {
    url,
    fileUri,
    fileType,
    fileName,
    fileSize,
    progressCallback,
    onComplete,
    errorCallback,
    conversationID,
    conversationTwilioID,
    messageOwnerEmailAddress,
    messageOwnerUserID,
  }: fileUploadProps,
  getXmlRef?: any
) => {
  if (!(await checkNetCon())) return;
  try {
    const xhr = new XMLHttpRequest();
    if (getXmlRef) getXmlRef(xhr);
    const data = new FormData();
    data.append("fileupload", {
      uri: fileUri,
      type: getFileType(fileType as any),
      name: fileName,
    });
    data.append("conversationID", conversationID);
    data.append("conversationTwilioID", conversationTwilioID);
    data.append("messageType", fileType);
    data.append("fileSize", fileSize);
    data.append("messageOwnerEmailAddress", messageOwnerEmailAddress);
    data.append("messageOwnerUserID", messageOwnerUserID);

    xhr.upload.addEventListener("progress", progressCallback);
    xhr.addEventListener("load", () => onComplete(xhr.response));
    xhr.open("PUT", url as any);
    xhr.send(data);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const response = xhr.responseText;
        if (xhr.status === 200) logger.log("successful");
        else errorCallback();
        logger.log("rspnnseeee ready :", response);
      }
    };
  } catch (e: any) {
    logger.log("errorrrrr :", e);
  }
};
