import { FETCH_TOC_DETAIL } from "./../../utils/actionName";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../connectivity/axiosClient";
import { FETCH_TOC_DETAIL_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import Config from "react-native-config";

export const fetchTOCDetail = createAsyncThunk(
  FETCH_TOC_DETAIL,
  async (intakeID: number) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    const res = await getRequest(
      `${FETCH_TOC_DETAIL_URL}${intakeID}`,
      Config.GENERALURL as any,
      accessToken
    );
    return res.data;
  }
);
