import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import { FETCH_TOCLIST_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import { FETCH_CONTACT } from "../../utils/actionName";

export const fetchTocList = createAsyncThunk(
  FETCH_CONTACT,
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    const res = await postRequest(
      FETCH_TOCLIST_URL,
      params,
      Config.GENERALURL as any,
      accessToken
    );
    return res.data;
  }
);
