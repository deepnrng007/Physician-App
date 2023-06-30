import { FETCH_CONFIG } from "./../../utils/actionName";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../connectivity/axiosClient";
import { FETCH_CONFIG_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import Config from "react-native-config";

export const fetchConfig = createAsyncThunk(FETCH_CONFIG, async () => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  const res = await getRequest(
    `${FETCH_CONFIG_URL}`,
    Config.GENERALURL as any,
    accessToken
  );
  return res.data;
});
