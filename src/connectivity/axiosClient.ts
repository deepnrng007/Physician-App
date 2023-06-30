import { REFRESH_TOKEN } from "./endpoints";
import {
  getEncryptedStorage,
  setEncryptedStorage,
} from "./../utils/encryptedStorage";
import { global } from "../global";
import axios from "axios";
import Config from "react-native-config";
import { encriptedStorageKeys, eventNames } from "../enums/constants";
import logger from "../utils/logger";
import { checkNetCon } from "../utils/utils";
import { DeviceEventEmitter } from "react-native";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = Config.MESSAGINGURL as any;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Ocp-Apim-Subscription-Key": Config.SUBSCRIPTIONCODE,
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export async function getRequest(URL: any, baseurl = "", accessToken = "") {
  if (!(await checkNetCon())) throw Error;
  if (baseurl !== "") {
    axiosClient.defaults.baseURL = baseurl;
  }
  axiosClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  return axiosClient.get(`${URL}`).then((response) => {
    logger.log("============= response ============= ", URL, response.data);
    return response;
  });
}

export async function postRequest(
  URL: any,
  payload: any,
  baseurl = "",
  accessToken = ""
) {
  if (!(await checkNetCon())) throw Error;
  //TODO: remove this base url code once api deployed on same server
  if (baseurl !== "") {
    axiosClient.defaults.baseURL = baseurl;
  }

  axiosClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

  const response = await axiosClient.post(`${URL}`, payload);
  logger.log("============= response ============= ", URL, response.data);
  return response;
}

export async function putRequest(
  URL: any,
  payload: any,
  baseurl = "",
  accessToken = ""
) {
  if (!(await checkNetCon())) throw Error;

  if (baseurl !== "") {
    axiosClient.defaults.baseURL = baseurl;
  }

  axiosClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

  const response = await axiosClient.put(`${URL}`, payload);
  return response;
}

export async function patchRequest(URL: any, payload: any) {
  if (!(await checkNetCon())) throw Error;
  return axiosClient
    .patch(`/${URL}`, payload)
    .then((response) => logger.log("post response:", response));
}

export function deleteRequest(URL: any) {
  return axiosClient.delete(`/${URL}`).then((response) => response.data);
}

axiosClient.interceptors.request.use((req) => {
  console.log(
    `request interceptor*****: ${req.method} ${req.baseURL}${req.url} ${req.data}`,
    req
  );
  // Important: request interceptors **must** return the request.
  return req;
});

export async function refreshToken(refreshToken: string) {
  const body = {
    token: refreshToken,
  };
  axiosClient.defaults.baseURL = Config.AUTHURL;
  return axiosClient.post(REFRESH_TOKEN, body);
}

axiosClient.interceptors.response.use(
  (response) => {
    logger.log(response);
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const loginDetails: any = await getEncryptedStorage(
            encriptedStorageKeys.LOGINDETAILS
          );
          const data = JSON.parse(loginDetails);

          const rs = await refreshToken(data.refreshToken);
          await setEncryptedStorage(encriptedStorageKeys.LOGINDETAILS, rs.data);
          const { jwtToken } = rs.data;
          global.LOGIN_ACCESS_TOKEN = jwtToken;
          global.ISREFRESHTOKENCALLED = true;
          axiosClient.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;
          originalConfig.headers["Authorization"] = `Bearer ${jwtToken}`;
          return axiosClient(originalConfig);
        } catch (err: any) {
          DeviceEventEmitter.emit(eventNames.LOG_OUT_EVENT);
        }
      }
      if (error.response.status === 403 && error.response.data) {
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);
