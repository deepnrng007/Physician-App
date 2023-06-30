import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { CONTACT_URL } from "../../connectivity/endpoints";
import { FETCH_CONTACT } from "../../utils/actionName";

export const fetchContacts = createAsyncThunk(
  FETCH_CONTACT,
  async (userID: string) => {
    const res = await getRequest(
      `${CONTACT_URL}?userId=${userID}`,
      Config.MESSAGINGURL as any
    );
    return res.data;
  }
);
