import { episodeAllList } from "./../../utils/jsonData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchEpisode } from "../apis/fetchEpisodeList";

type stateTypes = {
  episodeError: string | null;
  episodeLoading: boolean;
  status: string | null;
  episodeList: any;
};

const initialState: stateTypes = {
  episodeError: null,
  episodeLoading: false,
  status: null,
  episodeList: [],
};

const episodeListSlicer = createSlice({
  name: "episodeList",
  initialState: initialState,
  reducers: {
    clearepisodeListAction: (state) => {
      state.episodeList = [];
    },
  },
  extraReducers: {
    [fetchEpisode.pending as any]: (state) => {
      state.episodeLoading = true;
      state.status = "Pending";
      state.episodeError = null;
    },
    [fetchEpisode.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.episodeLoading = false;
      state.status = "Fulfilled";
      state.episodeList = action.payload;
      state.episodeError = null;
    },
    [fetchEpisode.rejected as any]: (state, action: any) => {
      state.episodeLoading = false;
      state.status = "Rejected";
      state.episodeError = action.error.message;
      state.episodeList = [];
    },
  },
});

export default episodeListSlicer.reducer;
export const { clearepisodeListAction } = episodeListSlicer.actions;
