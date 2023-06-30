import { UPDATE_TOC_URL } from "./../../connectivity/endpoints";
import { putRequest } from "../../connectivity/axiosClient";
import { global } from "../../global";
import Config from "react-native-config";

export const updateTOC = async (requestBody: any) => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const res = await putRequest(
      UPDATE_TOC_URL,
      requestBody,
      Config.GENERALURL as any,
      accessToken
    );
    return res.data;
  } catch (e) {
    return { errorMessage: e, IsValid: false };
  }
};
