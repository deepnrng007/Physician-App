import { fetchTOCDetail } from "./../apis/fetchTOCDetail";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateTypes = {
  ToCDetailError: string | null;
  ToCDetailLoading: boolean;
  status: string | null;
  tocDetail: any;
  approvedList: any;
};

const initialState: stateTypes = {
  ToCDetailError: null,
  ToCDetailLoading: false,
  status: null,
  tocDetail: [],
  approvedList: [],
};

const tocDetailSlicer = createSlice({
  name: "tocdetail",
  initialState: initialState,
  reducers: {
    clearTocDetailsAction: (state) => {
      state.tocDetail = [];
    },
    setApprovedList: (state, action: PayloadAction<any>) => {
      state.approvedList = action.payload;
    },
  },
  extraReducers: {
    [fetchTOCDetail.pending as any]: (state) => {
      state.ToCDetailLoading = true;
      state.status = "Pending";
      state.ToCDetailError = null;
    },
    [fetchTOCDetail.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.ToCDetailLoading = false;
      state.status = "Fulfilled";
      state.tocDetail = action.payload;
      state.ToCDetailError = null;
    },
    [fetchTOCDetail.rejected as any]: (state, action: any) => {
      state.ToCDetailLoading = false;
      state.status = "Rejected";
      state.ToCDetailError = action.error.message;
    },
  },
});

export default tocDetailSlicer.reducer;
export const { clearTocDetailsAction, setApprovedList } =
  tocDetailSlicer.actions;
