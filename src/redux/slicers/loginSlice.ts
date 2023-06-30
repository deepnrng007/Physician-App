import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsyncFetch } from "../apis/fetchLogin";
import { global } from "../../global";

type stateTypes = {
  loginError: string | null;
  loginLoading: boolean;
  loginStatus: string | null;
  loginDetails: any;
};

const initialState: stateTypes = {
  loginError: null,
  loginLoading: false,
  loginStatus: null,
  loginDetails: {},
};

const loginSliceReducer = createSlice({
  name: "loginSlicer",
  initialState: initialState,
  reducers: {
    clearLoginDetails: (state) => {
      //TODO: clear this data after fully login API implementation
      state.loginDetails = null;
    },
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
  },
  extraReducers: {
    [loginAsyncFetch.pending as any]: (state) => {
      state.loginLoading = true;
      state.loginStatus = "Pending";
      state.loginError = null;
    },
    [loginAsyncFetch.fulfilled as any]: (state, action: PayloadAction<any>) => {
      const { id, jwtToken, email, ...rest } = action.payload;
      state.loginLoading = false;
      state.loginStatus = "Fulfilled";
      state.loginDetails = {
        accessToken: jwtToken,
        userOwnerId: id,
        ownereMail: email,
        ...rest,
      };
      state.loginError = null;
      global.ISREFRESHTOKENCALLED = false;
    },
    [loginAsyncFetch.rejected as any]: (state, action: PayloadAction<any>) => {
      state.loginLoading = false;
      state.loginStatus = "Rejected";
      state.loginError = action.payload;
    },
  },
});

export default loginSliceReducer.reducer;
export const { clearLoginDetails, setLoginDetails } = loginSliceReducer.actions;
