import { VOICE_CALL_URL } from "./../../connectivity/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../connectivity/axiosClient";
import { VOICE_CALL } from "../../utils/actionName";
import { global } from "../../global";
import Config from "react-native-config";

export const initiateCall = createAsyncThunk(
  VOICE_CALL,
  async (requestBody: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    const res = await postRequest(
      VOICE_CALL_URL,
      requestBody,
      Config.TELEPHONYCURL as any,
      accessToken
    );
    return res.data;
  }
);
