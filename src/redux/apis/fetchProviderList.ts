import { FETCH_PROVIDER } from "./../../utils/actionName";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../connectivity/axiosClient";
import { FETCH_PROVIDER_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import Config from "react-native-config";

export const fetchProviderList = createAsyncThunk(FETCH_PROVIDER, async () => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  const res = await getRequest(
    `${FETCH_PROVIDER_URL}`,
    Config.GENERALURL as any,
    accessToken
  );
  return res.data;
});
