import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProviderList } from "../apis/fetchProviderList";

type stateTypes = {
  providerError: string | null;
  providerLoading: boolean;
  providerstatus: string | null;
  providerList: any;
};

const initialState: stateTypes = {
  providerError: null,
  providerLoading: false,
  providerstatus: null,
  providerList: [],
};

const providerListSlicer = createSlice({
  name: "providerList",
  initialState: initialState,
  reducers: {
    clearProviderListAction: (state) => {
      state.providerList = [];
    },
  },
  extraReducers: {
    [fetchProviderList.pending as any]: (state) => {
      state.providerLoading = true;
      state.providerstatus = "Pending";
      state.providerError = null;
    },
    [fetchProviderList.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.providerLoading = false;
      state.providerstatus = "Fulfilled";
      state.providerList = action.payload;
      state.providerError = null;
    },
    [fetchProviderList.rejected as any]: (state, action: any) => {
      state.providerLoading = false;
      state.providerstatus = "Rejected";
      state.providerError = action.error.message;
      state.providerList = [];
    },
  },
});

export default providerListSlicer.reducer;
export const { clearProviderListAction } = providerListSlicer.actions;
