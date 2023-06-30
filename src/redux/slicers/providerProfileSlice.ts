import { fetchProviderProfile } from "./../apis/fetchProviderProfile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateTypes = {
  profileError: string | null;
  profileLoading: boolean;
  profilestatus: string | null;
  profileData: any;
};

const initialState: stateTypes = {
  profileError: null,
  profileLoading: false,
  profilestatus: null,
  profileData: {},
};

const providerProfileSlice = createSlice({
  name: "profileData",
  initialState: initialState,
  reducers: {
    clearProfileDataAction: (state) => {
      state.profileData = {};
    },
  },
  extraReducers: {
    [fetchProviderProfile.pending as any]: (state) => {
      state.profileLoading = true;
      state.profilestatus = "Pending";
      state.profileError = null;
    },
    [fetchProviderProfile.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.profileLoading = false;
      state.profilestatus = "Fulfilled";
      state.profileData = action.payload;
      state.profileError = null;
    },
    [fetchProviderProfile.rejected as any]: (state, action: any) => {
      state.profileLoading = false;
      state.profilestatus = "Rejected";
      state.profileError = action.error.message;
      state.profileData = {};
    },
  },
});

export default providerProfileSlice.reducer;
export const { clearProfileDataAction } = providerProfileSlice.actions;
