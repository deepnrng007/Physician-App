import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import { LOGIN_URL } from "../../connectivity/endpoints";

export const loginAsyncFetch = createAsyncThunk(
  "loginSlicer",
  async (params: any) => {
    const res = await postRequest(LOGIN_URL, params, Config.AUTHURL);
    return res?.data;
  }
);
