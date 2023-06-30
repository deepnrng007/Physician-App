import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchTocList } from "../apis/fetchTocList";

type stateTypes = {
  tocLitError: string | null;
  tocListLoading: boolean;
  status: string | null;
  tocListDetails: any;
};

const initialState: stateTypes = {
  tocLitError: null,
  tocListLoading: false,
  status: null,
  tocListDetails: {},
};

const TocLitSlicer = createSlice({
  name: "tocListSlicer",
  initialState: initialState,
  reducers: {
    clearTocListsAction: (state) => {
      state.tocListDetails = {};
    },
  },
  extraReducers: {
    [fetchTocList.pending as any]: (state) => {
      state.tocListLoading = true;
      state.status = "Pending";
      state.tocLitError = null;
      state.tocListDetails = {};
    },
    [fetchTocList.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.tocListLoading = false;
      state.status = "Fulfilled";
      state.tocListDetails = action.payload;
      state.tocLitError = null;
    },
    [fetchTocList.rejected as any]: (state, action: any) => {
      state.tocListLoading = false;
      state.status = "Rejected";
      state.tocLitError = action.error;
    },
  },
});

export default TocLitSlicer.reducer;
export const { clearTocListsAction } = TocLitSlicer.actions;
