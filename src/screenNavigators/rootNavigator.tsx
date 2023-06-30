import React, { useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "../enums/screenNames";
import {
  Contact,
  EpisodeDetails,
  Login,
  AllChatMessages,
  Chat,
  CreateConversion,
  SplashSreen,
  ResetPassword,
  OTPScreen,
  ConfirmPasswords,
  FaceAndTouchIDEnable,
  PDFViewer,
  AboutApp,
} from "../screens";
import DrawerNavigation from "./drawerNavigation";
import TocDetail from "../screens/TOCs/detail";
import NotificationScreen from "../screens/notification";
import {
  encriptedStorageKeys,
  eventNames,
  NOTIFICATION,
  notificationTypes,
  SESSION_TIMEOUT,
} from "../enums/constants";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
} from "../utils/encryptedStorage";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { useAppDispatch, useAppSelector } from "../components";
import { global } from "../global";
import {
  clearLoginDetails,
  setLoginDetails,
} from "../redux/slicers/loginSlice";
import UserInactivity from "react-native-user-inactivity";
import _BackgroundTimer from "react-native-background-timer";
import SessionExpireModal from "../components/blockComponents/SessionExpireModal";
import logger from "../utils/logger";
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
} from "react-native";
import { clearChatIdsAction } from "../redux/slicers/chatIdsSlice";
import { clearConfigAction } from "../redux/slicers/configDataSlice";
import { clearepisodeListAction } from "../redux/slicers/episodeListslice";
import { clearTocListsAction } from "../redux/slicers/tocListSlice";
import { clearVoiceCallAction } from "../redux/slicers/voiceCallSlice";
import { clearProfileDataAction } from "../redux/slicers/providerProfileSlice";
import { clearConversationListAction } from "../redux/slicers/messageSlice";
import { clearContactAction } from "../redux/slicers/contactSlice";
import { clearNotificationDataAction } from "../redux/slicers/notificationSlice";
import { clearTocDetailsAction } from "../redux/slicers/tocDetailSlice";
import { clearProviderListAction } from "../redux/slicers/providerListSlice";
import { createFile, isAndroid, isParsable, setFCMToken } from "../utils/utils";
import { fetchAccessToken } from "../screens/messages/helper";
import { setTwilioClient } from "../screens/helper";
import { StackActions } from "@react-navigation/native";

export type RootStackParams = {
  SPLASHSCREEN: undefined;
  LOGIN: undefined;
  DRAWERNAVIGATION: undefined;
  CONTACT: undefined;
  EPISODEDETAILS: {
    patientData?: any;
    updateLoader?: any;
    intakeID?: string;
    cameFrom?: string;
  };
  EPISODELIST: undefined;
  TOCDETAILS: {
    intakeID: number;
    count?: number;
    updateLoader?: any;
    cameFrom?: string;
  };
  ALLCHATMESSAGES: undefined;
  CHAT: {
    conversionName: string;
    message?: any;
    conversationID?: number;
    twilioConversationId?: string;
    messageIndex?: number;
    navigateTo?: string;
    cameFrom?: string;
    participantDetails?: any[];
  };
  CREATECONVERSION: undefined;
  NOTIFICATIONS: undefined;
  RESETPASSWORD: undefined;
  FACEIDTOUCHIDENABLE: undefined;
  OTPSCREEN: {
    resetData: any;
  };
  CONFIRMPASSWORD: {
    resetData: any;
  };
  PDFVIEWERSCREEN: {
    url: string;
    showButtons?: boolean;
    isBackRequired?: boolean;
  };
  ABOUTENAVPROVIDER: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [clickedLogout, setClickedLogout] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const { loginDetails } = useAppSelector((state) => state.login);
  const { accessToken = null } = loginDetails ? loginDetails : {};
  const accessTokenRef = useRef(accessToken);
  const signOutEmmitter = () => {
    clearAllData();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screenNames.LOGIN,
        },
      ],
    });
  };

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  const clearAllData = async () => {
    const res = await removeEncryptedStorage(encriptedStorageKeys.LOGINDETAILS);

    global.PREVIOUSSCREEN = null;
    global.ACCESS_TOKEN = null;
    global.FCM_TOKEN = null;
    global.LOGIN_ACCESS_TOKEN = null;
    global.OWNER_EMAILID = null;
    global.OWNER_USERID = null;
    global.ISREFRESHTOKENCALLED = false;

    dispatch(clearLoginDetails());
    dispatch(clearChatIdsAction());
    dispatch(clearConfigAction());
    dispatch(clearContactAction());
    dispatch(clearepisodeListAction());
    dispatch(clearConversationListAction());
    dispatch(clearNotificationDataAction());
    dispatch(clearProviderListAction());
    dispatch(clearProfileDataAction());
    dispatch(clearTocDetailsAction());
    dispatch(clearTocListsAction());
    dispatch(clearVoiceCallAction());
  };

  useEffect(() => {
    getdata();
    createFile();
    DeviceEventEmitter.addListener(eventNames.NOTIFYEVENT, goToNavigate);
    DeviceEventEmitter.addListener(eventNames.LOG_OUT_EVENT, signOutEmmitter);
    eventListeners();
  }, []);

  const eventListeners = () => {
    let eventListener: any = null;
    if (isAndroid()) {
      const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
      eventListener = eventEmitter.addListener(
        "onClickNotificationEvent",
        (notificationPayload) => {
          goToNavigate(notificationPayload);
        }
      );
    } else {
      const nativeEventSupport = new NativeEventEmitter(
        NativeModules.NativeEventManager
      );
      nativeEventSupport.addListener(
        "onClickNotificationEvent",
        (notificationPayload) => {
          goToNavigate(notificationPayload);
        }
      );
    }
  };

  const goToNavigate = (params: any, path = "" as string) => {
    removeEncryptedStorage(encriptedStorageKeys.NOTIFICATION_PAYLOAD);
    if (isParsable(params)) {
      const notificationPayload = JSON.parse(params);
      const {
        actionEntityId = "",
        actionType = "",
        title = "",
        twilioConversationId = "",
      } = notificationPayload;
      const statesRoutes = navigation?.getState()?.routes;
      let currentScreen = "";
      if (statesRoutes && statesRoutes.length > 0)
        currentScreen = statesRoutes[statesRoutes.length - 1]?.name;
      if (accessTokenRef.current) {
        if (actionType === notificationTypes.NEW_TOC) {
          const params = {
            intakeID: actionEntityId,
            count: 0,
            cameFrom: path,
          };
          if (currentScreen === screenNames.TOCDETAILS)
            navigation.dispatch(
              StackActions.replace(screenNames.TOCDETAILS, params)
            );
          else navigation.navigate(screenNames.TOCDETAILS, params);
        } else if (actionType === notificationTypes.NEW_MESSAGE) {
          const params = {
            conversionName: title,
            conversationID: parseInt(actionEntityId),
            twilioConversationId,
            cameFrom: path,
          };
          if (currentScreen === screenNames.CHAT)
            navigation.dispatch(StackActions.replace(screenNames.CHAT, params));
          else navigation.navigate(screenNames.CHAT, params);
        } else if (actionType === notificationTypes.PATIENT_OFFTRACK) {
          const params = {
            intakeID: actionEntityId,
            cameFrom: path,
          };
          if (currentScreen === screenNames.EPISODEDETAILS)
            navigation.dispatch(
              StackActions.replace(screenNames.EPISODEDETAILS, params)
            );
          else navigation.navigate(screenNames.EPISODEDETAILS, params);
        }
      } else {
        global.NOTIFICATIONNAVIGATEPENDING = params;
      }
    } else logger.log("error while parsing", params);
  };

  useEffect(() => {
    if (isActive && clickedLogout) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: screenNames.LOGIN,
            },
          ],
        });
        clearAllData();
      }, 100);
    }
  }, [isActive, clickedLogout]);

  const getdata = async () => {
    const loginDetails: any = await getEncryptedStorage(
      encriptedStorageKeys.LOGINDETAILS
    );
    const notificationPayload: any = await getEncryptedStorage(
      encriptedStorageKeys.NOTIFICATION_PAYLOAD
    );
    const bindingSid = await getEncryptedStorage(
      encriptedStorageKeys.BINDINGSID
    );
    global.BINDINGSID = bindingSid;
    const data = JSON.parse(loginDetails);
    if (data) {
      global.ISFIRSTTIMELOGGED = false;
      global.OWNER_EMAILID = data.ownereMail;
      global.OWNER_USERID = data.userOwnerId;
      global.LOGIN_ACCESS_TOKEN = data.accessToken;
      dispatch(setLoginDetails(data));
      setFCMToken();
      const res = await fetchAccessToken(data.ownereMail as any);
      if (res) {
        const { msgAccessToken } = res;
        if (msgAccessToken) setTwilioClient(msgAccessToken);
      }
    }
    setTimeout(() => {
      setShowSplash(false);
      global.NOTIFICATIONNAVIGATEPENDING = notificationPayload;
      if (data && notificationPayload) {
        goToNavigate(notificationPayload, NOTIFICATION);
      } else if (loginDetails && !global.ISREFRESHTOKENCALLED) {
        if (
          data["isAcceptedTermsAndConditions"] !== undefined &&
          !data.isAcceptedTermsAndConditions
        )
          navigationToScreen(screenNames.PDFVIEWERSCREEN, {
            url: data.termsAndConditions,
            isBackRequired: false,
          });
        else navigationToScreen(screenNames.DRAWERNAVIGATION, {});
      }
    }, 3000);
  };

  const navigationToScreen = (screenName: string, params: any) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screenName as any,
          params: params,
        },
      ],
    });
  };

  const logout = async () => {
    setClickedLogout(true);
    setIsActive(true);
  };

  return (
    <UserInactivity
      onAction={(active) => {
        logger.log("action", active);
        if (isActive && global.LOGIN_ACCESS_TOKEN) setIsActive(active);
      }}
      timeForInactivity={SESSION_TIMEOUT}
      timeoutHandler={_BackgroundTimer as any}
      skipKeyboard={false}
    >
      {global.LOGIN_ACCESS_TOKEN && (
        <SessionExpireModal visible={!isActive} onPress={() => logout()} />
      )}

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {showSplash && (
          <Stack.Screen
            name={screenNames.SPLASHSCREEN}
            component={SplashSreen}
          />
        )}
        <Stack.Screen name={screenNames.LOGIN} component={Login} />
        <Stack.Screen
          name={screenNames.RESETPASSWORD}
          component={ResetPassword}
        />
        <Stack.Screen name={screenNames.OTPSCREEN} component={OTPScreen} />
        <Stack.Screen
          name={screenNames.CONFIRMPASSWORD}
          component={ConfirmPasswords}
        />
        <Stack.Screen
          name={screenNames.DRAWERNAVIGATION}
          component={DrawerNavigation}
        />
        <Stack.Screen name={screenNames.CONTACT} component={Contact} />
        <Stack.Screen
          name={screenNames.ALLCHATMESSAGES}
          component={AllChatMessages}
        />
        <Stack.Screen
          name={screenNames.EPISODEDETAILS}
          component={EpisodeDetails}
        />
        <Stack.Screen name={screenNames.TOCDETAILS} component={TocDetail} />
        <Stack.Screen name={screenNames.CHAT} component={Chat} />
        <Stack.Screen
          name={screenNames.CREATECONVERSION}
          component={CreateConversion}
        />
        <Stack.Screen
          name={screenNames.NOTIFICATIONS}
          component={NotificationScreen}
        />
        <Stack.Screen
          name={screenNames.FACEIDTOUCHIDENABLE}
          component={FaceAndTouchIDEnable}
        />
        <Stack.Screen
          name={screenNames.PDFVIEWERSCREEN}
          component={PDFViewer}
        />
        <Stack.Screen
          name={screenNames.ABOUTENAVPROVIDER}
          component={AboutApp}
        />
      </Stack.Navigator>
    </UserInactivity>
  );
};

export default RootNavigator;
