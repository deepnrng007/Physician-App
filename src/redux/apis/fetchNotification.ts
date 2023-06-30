import { FETCH_NOTIFICATIONS } from "./../../utils/actionName";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../connectivity/axiosClient";
import { FETCH_NOTIFICATIONS_URL } from "../../connectivity/endpoints";
import { notificationData } from "../../utils/jsonData";
import axios from "axios";

export const fetchNotification = createAsyncThunk(
  FETCH_NOTIFICATIONS,
  async (userId: number) => {
    await axios.get("https://jsonplaceholder.typicode.com/todos/" + userId);
    //return res.data;
    return notificationData;
  }
);
