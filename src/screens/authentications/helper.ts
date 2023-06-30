import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import {
  PASWORD_RESET,
  RESET_WITH_VERIFYCATION_CODE,
  VERIFY_OTP,
} from "../../connectivity/endpoints";
import { global } from "../../global";

export const getOTP = async (userName: string) => {
  try {
    const res = await postRequest(
      RESET_WITH_VERIFYCATION_CODE,
      { userName },
      Config.AUTHURL,
      global.LOGIN_ACCESS_TOKEN as any
    );
    return res.data;
  } catch (err: any) {
    return err;
  }
};

export const getValidateOTP = async (params: any) => {
  try {
    const res = await postRequest(
      VERIFY_OTP,
      params,
      Config.MESSAGINGURL as any,
      global.LOGIN_ACCESS_TOKEN as any
    );
    return res.data;
  } catch (err: any) {
    return err;
  }
};

export const updateConfirmPwd = async (params: any) => {
  try {
    const res = await postRequest(
      PASWORD_RESET,
      params,
      Config.AUTHURL as any,
      global.LOGIN_ACCESS_TOKEN as any
    );
    return res.data;
  } catch (err: any) {
    return err;
  }
};
