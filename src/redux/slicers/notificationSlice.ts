import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotification } from "../apis/fetchNotification";

type stateTypes = {
  notyError: string | null;
  notyLoading: boolean;
  notyStatus: string | null;
  notyDetails: any;
};

const initialState: stateTypes = {
  notyError: null,
  notyLoading: false,
  notyStatus: null,
  notyDetails: null,
};

const notificationSlicer = createSlice({
  name: "notificationSlice",
  initialState: initialState,
  reducers: {
    removeNotification: (state, action) => {
      state.notyDetails = {
        ...state.notyDetails,
        notificationDetails: state.notyDetails.notificationDetails.filter(
          (item: any) => {
            return item.id !== action.payload;
          }
        ),
      };
    },
    clearAllNotification: (state) => {
      state.notyDetails = {
        ...state.notyDetails,
        notificationDetails: [],
      };
    },
    markAllAsRead: (state) => {
      state.notyDetails = {
        ...state.notyDetails,
        notificationDetails: state.notyDetails.notificationDetails.map(
          (item: any) => (item.isActive ? { ...item, isActive: false } : item)
        ),
      };
    },
    clearNotificationDataAction: (state) => {
      state.notyDetails = null;
    },
  },
  extraReducers: {
    [fetchNotification.pending as any]: (state) => {
      state.notyLoading = true;
      state.notyStatus = "Pending";
      state.notyError = null;
    },
    [fetchNotification.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.notyLoading = false;
      state.notyStatus = "Fulfilled";
      state.notyDetails = action.payload;
      state.notyError = null;
    },
    [fetchNotification.rejected as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.notyLoading = false;
      state.notyStatus = "Rejected";
      state.notyError = action.payload;
    },
  },
});

export default notificationSlicer.reducer;
export const {
  removeNotification,
  clearAllNotification,
  markAllAsRead,
  clearNotificationDataAction,
} = notificationSlicer.actions;
