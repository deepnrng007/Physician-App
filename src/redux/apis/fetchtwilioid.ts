import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import { CREATE_CONVERSATION_URL } from "../../connectivity/endpoints";

type props = {
  participantsUserId: number[];
  type: string;
  tag: any;
};
// If already exists : 200
// For new created conversation : 201
export const fetchTwilioids = createAsyncThunk(
  "twilioIdsSlicer",
  async (params: props) => {
    const res = await postRequest(
      CREATE_CONVERSATION_URL,
      params,
      Config.MESSAGINGURL as any
    );
    const data = {
      isConversationExist: res.status === 201 ? false : true,
      ...res.data,
    };
    return data;
  }
);
