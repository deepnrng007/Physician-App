import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConfig } from "../apis/fetchConfig";

type stateTypes = {
  configError: string | null;
  configLoading: boolean;
  configstatus: string | null;
  configData: any;
};

const initialState: stateTypes = {
  configError: null,
  configLoading: false,
  configstatus: null,
  configData: {},
};

const configDataSlice = createSlice({
  name: "configData",
  initialState: initialState,
  reducers: {
    clearConfigAction: (state) => {
      state.configData = {};
    },
  },
  extraReducers: {
    [fetchConfig.pending as any]: (state) => {
      state.configLoading = true;
      state.configstatus = "Pending";
      state.configError = null;
    },
    [fetchConfig.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.configLoading = false;
      state.configstatus = "Fulfilled";
      state.configData = action.payload;
      state.configError = null;
    },
    [fetchConfig.rejected as any]: (state, action: any) => {
      state.configLoading = false;
      state.configstatus = "Rejected";
      state.configError = action.error.message;
      state.configData = {};
    },
  },
});

export default configDataSlice.reducer;
export const { clearConfigAction } = configDataSlice.actions;
