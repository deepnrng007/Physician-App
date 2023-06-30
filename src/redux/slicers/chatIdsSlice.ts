import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTwilioids } from "../apis/fetchtwilioid";

type stateTypes = {
  chatIderror: string | null;
  chatIdLoading: boolean;
  status: string | null;
  idsDetails: any;
};

const initialState: stateTypes = {
  chatIderror: null,
  chatIdLoading: false,
  status: null,
  idsDetails: {},
};

const chatIdsSlicer = createSlice({
  name: "twilioids",
  initialState: initialState,
  reducers: {
    clearChatIdsAction: (state) => {
      state.idsDetails = {};
    },
    addChatIdsAction: (state, action: PayloadAction<any>) => {
      state.idsDetails = action.payload;
    },
  },
  extraReducers: {
    [fetchTwilioids.pending as any]: (state) => {
      state.chatIdLoading = true;
      state.status = "Pending";
      state.chatIderror = null;
    },
    [fetchTwilioids.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.chatIdLoading = false;
      state.status = "Fulfilled";
      state.idsDetails = action.payload;
      state.chatIderror = null;
    },
    [fetchTwilioids.rejected as any]: (state, action: PayloadAction<any>) => {
      state.chatIdLoading = false;
      state.status = "Rejected";
      state.chatIderror = action.error;
    },
  },
});

export default chatIdsSlicer.reducer;
export const { clearChatIdsAction, addChatIdsAction } = chatIdsSlicer.actions;
