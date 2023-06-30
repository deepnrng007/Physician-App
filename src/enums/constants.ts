export enum attachmentType {
  DOCUMENT = "DOCUMENT",
  CAMERA = "CAMERA",
  GALLERY = "GALLERY",
}

export enum mediaTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  PDF = "PDF",
  DOC = "WORD",
}

export enum conversationType {
  EPISODE = "EPISODE",
  GENERAL = "GENERAL",
  TOC = "TOC",
}

export enum NOTIFICATIONTYPE {
  message = "NEW_MESSAGE",
  approveTOC = "TOC_APPROVAL",
  offTrackTOC = "OFFTRACK_PATIENT",
}

export enum encriptedStorageKeys {
  LOGINDETAILS = "LOGINDETAILS",
  ACCESSTOKEN = "ACCESSTOKEN",
  USERNAMEANDPWD = "USERNAMEANDPWD",
  CONVERSATION_ID_KEY = "CONVERSATION_ID_KEY",
  ACCESS_TOKEN = "ACCESS_TOKEN",
  PROFILEDATA = "PROFILEDATA",
  ENABLETOUCHID = "ENABLETOUCHID",
  NOTIFICATION_PAYLOAD = "NOTIFICATION_PAYLOAD",
  LASTCHATSCREENVISIT = "LASTCHATSCREENVISIT",
  BINDINGSID = "BINDINGSID",
}

export enum trackStatus {
  ONTRACK = "On-Track",
  OFFTRACK = "Off-Track",
  PPROVED = "Approved",
  PENDING = "Pending",
}

export enum episodeTrackStatus {
  ONTRACK = "OnTrack",
  OFFTRACK = "OffTrack",
  TOCNOTCREATED = "ToC Not Created",
  TOCPENDING = "ToC Pending",
}

export const AuthenticationTypes = {
  TOUCHID: "TouchID",
  FACEID: "FaceID",
  BIOMETRIC: "Biometrics",
};

export const notificationTypes = {
  NEW_MESSAGE: "NEW_MESSAGE",
  NEW_TOC: "NEW_TOC",
  PATIENT_OFFTRACK: "PATIENT_OFFTRACK",
};

export const eventNames = {
  LOG_OUT_EVENT: "LOG_OUT_EVENT",
  NOTIFYEVENT: "NOTIFYEVENT",
};
export const USERTYPE = "physician";
export const responseStatus = "success";
export const SESSION_TIMEOUT = 1000 * 60 * 30;
export const NOTIFICATION = "NOTIFICATION";
