import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { initiateCall } from "../apis/voiceCall";

type stateTypes = {
  voiceCallError: string | null;
  voiceCallLoading: boolean;
  voiceCallstatus: string | null;
  voiceCallResponse: any;
};

const initialState: stateTypes = {
  voiceCallError: null,
  voiceCallLoading: false,
  voiceCallstatus: null,
  voiceCallResponse: {},
};

const voiceCallSlice = createSlice({
  name: "voiceCall",
  initialState: initialState,
  reducers: {
    clearVoiceCallAction: (state) => {
      state.voiceCallResponse = {};
      state.voiceCallError = null;
    },
  },
  extraReducers: {
    [initiateCall.pending as any]: (state) => {
      state.voiceCallLoading = true;
      state.voiceCallstatus = "Pending";
      state.voiceCallError = null;
    },
    [initiateCall.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.voiceCallLoading = false;
      state.voiceCallstatus = "Fulfilled";
      state.voiceCallResponse = action.payload;
      state.voiceCallError = null;
    },
    [initiateCall.rejected as any]: (state, action: any) => {
      state.voiceCallLoading = false;
      state.voiceCallstatus = "Rejected";
      state.voiceCallError = action.error;
    },
  },
});

export default voiceCallSlice.reducer;
export const { clearVoiceCallAction } = voiceCallSlice.actions;
