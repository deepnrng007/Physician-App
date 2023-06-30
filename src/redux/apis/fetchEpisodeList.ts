import { FETCH_EPISODE_LIST_URL } from "./../../connectivity/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../connectivity/axiosClient";
import { FETCH_EPISODE_LIST } from "../../utils/actionName";
import { global } from "../../global";
import Config from "react-native-config";

export const fetchEpisode = createAsyncThunk(
  FETCH_EPISODE_LIST,
  async (requestBody: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    const res = await postRequest(
      FETCH_EPISODE_LIST_URL,
      requestBody,
      Config.GENERALURL as any,
      accessToken
    );
    return res.data;
  }
);
