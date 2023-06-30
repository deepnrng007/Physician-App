import { postRequest } from "./../../connectivity/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_CONVERSATION_LIST } from "../../connectivity/endpoints";
import { LIST_CONVERSATION } from "../../utils/actionName";
import Config from "react-native-config";

export const getAllConversationList = createAsyncThunk(
  LIST_CONVERSATION,
  async (params: any) => {
    const response = await postRequest(
      ALL_CONVERSATION_LIST,
      params,
      Config.MESSAGINGURL as any
    );
    return response.data;
  }
);
