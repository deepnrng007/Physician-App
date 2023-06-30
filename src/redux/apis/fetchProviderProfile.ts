import { FETCH_PROFILE_URL } from "./../../connectivity/endpoints";
import { FETCH_PROFILE } from "./../../utils/actionName";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../connectivity/axiosClient";
import { global } from "../../global";
import Config from "react-native-config";

export const fetchProviderProfile = createAsyncThunk(
  FETCH_PROFILE,
  async (userID: string) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    const res = await getRequest(
      `${FETCH_PROFILE_URL}/${userID}`,
      Config.GENERALURL as any,
      accessToken
    );
    return res.data;
  }
);
