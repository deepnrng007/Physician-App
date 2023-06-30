import { configureStore } from "@reduxjs/toolkit";
import chatIdsSlice from "./slicers/chatIdsSlice";
import contactSlice from "./slicers/contactSlice";
import episodeListslice from "./slicers/episodeListslice";
import loginSlice from "./slicers/loginSlice";
import messageReducer from "./slicers/messageSlice";
import tocDetailSlice from "./slicers/tocDetailSlice";
import notificationSlicer from "./slicers/notificationSlice";
import TocLitSlicer from "./slicers/tocListSlice";
import providerListSlice from "./slicers/providerListSlice";
import configSlice from "./slicers/configDataSlice";
import voiceCallSlice from "./slicers/voiceCallSlice";
import providerProfileSlice from "./slicers/providerProfileSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    contactList: contactSlice,
    message: messageReducer,
    chatIds: chatIdsSlice,
    tocDetail: tocDetailSlice,
    episodeList: episodeListslice,
    notification: notificationSlicer,
    tocList: TocLitSlicer,
    providerList: providerListSlice,
    configData: configSlice,
    voiceCall: voiceCallSlice,
    profileData: providerProfileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: !__DEV__,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
