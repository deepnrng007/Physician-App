import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts } from "../apis/fetchContacts";

type stateTypes = {
  contactError: string | null;
  contactLoading: boolean;
  status: string | null;
  contactList: any;
};

const initialState: stateTypes = {
  contactError: null,
  contactLoading: false,
  status: null,
  contactList: [],
};

const contactSlicer = createSlice({
  name: "contactsList",
  initialState: initialState,
  reducers: {
    clearContactAction: (state) => {
      state.contactList = [];
    },
  },
  extraReducers: {
    [fetchContacts.pending as any]: (state) => {
      state.contactLoading = true;
      state.status = "Pending";
      state.contactError = null;
    },
    [fetchContacts.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.contactLoading = false;
      state.status = "Fulfilled";
      state.contactList = action.payload;
      state.contactError = null;
    },
    [fetchContacts.rejected as any]: (state, action: any) => {
      state.contactLoading = false;
      state.status = "Rejected";
      state.contactError = action.error.message;
    },
  },
});

export default contactSlicer.reducer;
export const { clearContactAction } = contactSlicer.actions;
