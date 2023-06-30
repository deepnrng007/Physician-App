/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { View, ViewStyle, Image, DeviceEventEmitter } from "react-native";
import {
  AppButton,
  AppText,
  ContainerView,
  ModalLoader,
  TextInputComponent,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import LoginButton from "../../../components/baseComponents/loginButton";
import { langVar, screenNames, translate } from "../../../enums";
import {
  AuthenticationTypes,
  encriptedStorageKeys,
  eventNames,
  NOTIFICATION,
} from "../../../enums/constants";
import { global } from "../../../global";
import { loginAsyncFetch } from "../../../redux/apis/fetchLogin";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import {
  getEncryptedStorage,
  setEncryptedStorage,
} from "../../../utils/encryptedStorage";
import { GradientBGImage } from "../../../utils/imagePaths";
import { setFCMToken } from "../../../utils/utils";
import { isFieldEmpty } from "../../../utils/validations";
import ReactNativeBiometrics from "react-native-biometrics";
import styles from "./styles";
import logger from "../../../utils/logger";

type Props = NativeStackScreenProps<RootStackParams, screenNames.LOGIN>;
const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const Login = (props: Props) => {
  const { navigation } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { loginData } = useAppSelector((state) => {
    return {
      loginData: state.login,
    };
  });
  const { loginDetails } = loginData;
  const [error, setIsError] = useState(false);
  const [isFocued, setISfocused] = useState(false);
  const [isBioMetricEnabled, setisBioMetricEnabled] = useState(false);
  const [biometricType, setBiometricType] = useState("");
  const [userNameAndPassword, setuserNameAndPassword] = useState<any>(null);
  const [isBiometricAuth, setisBiometricAuth] = useState(false);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { biometryType } = resultObject;
      if (biometryType) setBiometricType(biometryType);
    });
  }, []);

  const checkToggleValue = async () => {
    const res = await getEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
    if (res) setisBioMetricEnabled(true);
    else setisBioMetricEnabled(false);
  };

  const promptAuth = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: "Confirm Authentication for Login" })
      .then((resultObject) => {
        const { success } = resultObject;
        if (success) {
          setLoading(true);
          setisBiometricAuth(true);
          onPressLogin(userNameAndPassword);
        } else {
          setisBiometricAuth(false);
        }
      })
      .catch((error) => {
        setisBiometricAuth(false);
        logger.log("simplePrompt error :", error);
      });
  };

  const getLoginDetails = async () => {
    const data = await getEncryptedStorage(encriptedStorageKeys.USERNAMEANDPWD);
    if (data) {
      global.ISFIRSTTIMELOGGED = false;
      setuserNameAndPassword(JSON.parse(data));
    } else global.ISFIRSTTIMELOGGED = true;
  };

  useEffect(() => {
    if (loginDetails && loginDetails.accessToken) {
      const {
        accessToken,
        ownereMail,
        userOwnerId,
        termsAndConditions,
        isAcceptedTermsAndConditions,
      } = loginDetails;
      global.LOGIN_ACCESS_TOKEN = accessToken as any;
      global.OWNER_EMAILID = ownereMail;
      global.OWNER_USERID = userOwnerId;
      navigateTo(isAcceptedTermsAndConditions, termsAndConditions);
      setFCMToken();
    } else {
      setLoading(false);
      setIsError(true);
    }
  }, [loginDetails]);

  useFocusEffect(
    useCallback(() => {
      setISfocused(true);
      getLoginDetails();
      checkToggleValue();
      return () => setISfocused(false);
    }, [])
  );

  const navigateTo = async (
    isAcceptedTermsAndConditions: boolean,
    termsAndConditions: string
  ) => {
    if (isFocued) {
      await setEncryptedStorage(
        encriptedStorageKeys.LOGINDETAILS,
        loginDetails
      );
      if (checkValidation())
        await setEncryptedStorage(encriptedStorageKeys.USERNAMEANDPWD, {
          userName,
          password,
        });
      setLoading(false);
      if (global.NOTIFICATIONNAVIGATEPENDING) {
        DeviceEventEmitter.emit(
          eventNames.NOTIFYEVENT,
          global.NOTIFICATIONNAVIGATEPENDING,
          NOTIFICATION
        );
      } else {
        if (!isAcceptedTermsAndConditions)
          navigation.replace(screenNames.PDFVIEWERSCREEN, {
            url: termsAndConditions,
            isBackRequired: false,
          });
        else navigation.replace(screenNames.DRAWERNAVIGATION);
      }
    }
  };

  const onPasswordType = (text: string) => {
    setIsError(false);
    setPassword(text);
  };

  const onIDType = (text: string) => {
    setIsError(false);
    setUserName(text);
  };

  const checkValidation = () => {
    return !isFieldEmpty(userName) && !isFieldEmpty(password);
  };

  const onPressLogin = async (userAndPassword?: any) => {
    if (checkValidation() || userAndPassword) {
      setLoading(true);
      const data = {
        userName,
        password,
        ...userAndPassword, //if data exit, then it will override above username and password
      };
      dispatch(loginAsyncFetch(data));
    }
  };

  const resetPassword = () => {
    navigation.navigate(screenNames.RESETPASSWORD);
  };
  const getTypeOfAuth = () => {
    if (biometricType === AuthenticationTypes.TOUCHID)
      return translate.t(langVar.touchID);
    else if (biometricType === AuthenticationTypes.FACEID)
      return translate.t(langVar.faceId);
    else return translate.t(langVar.touchID);
  };

  const showTouchID = () => {
    if (biometricType) promptAuth();
  };

  return (
    <ContainerView style={styles.container as ViewStyle} enableSafeArea={false}>
      {isBiometricAuth && <ModalLoader visible={loading} />}
      <View
        style={{
          position: "absolute",
        }}
      >
        <GradientBGImage />
      </View>
      <AvoidKeyboardComponent style={{ flex: 1 }}>
        <AppText style={styles.loginTitle}>
          {translate.t(langVar.loginIn)}
        </AppText>

        {/* <SnackBarComponent onClose={() => {}} /> */}
        <View style={styles.inputContainer}>
          <TextInputComponent
            testID={"userNameLoginID"}
            isError={error}
            onTextChange={onIDType}
            label={translate.t(langVar.userName)}
            inputValue={userName}
          />
          <TextInputComponent
            secureTextEntry
            testID={"passwordLoginID"}
            isError={error}
            onTextChange={onPasswordType}
            label={translate.t(langVar.password)}
            style={styles.input}
            inputValue={password}
          />
          <AppButton
            onPress={resetPassword}
            style={{ alignSelf: "flex-end" }}
            testID={"loginButtonID"}
          >
            <AppText style={styles.forgotPassword}>
              {translate.t(langVar.forgotPassword)}
            </AppText>
          </AppButton>

          <LoginButton
            onPress={onPressLogin}
            enable={checkValidation()}
            loading={isBiometricAuth ? false : loading}
            label={translate.t(langVar.loginspaceIn)}
          />
        </View>
        {biometricType.length > 0 && isBioMetricEnabled && (
          <AppText style={styles.loginWithTouch} onPress={showTouchID}>
            {translate.t(langVar.loginwith)} {getTypeOfAuth()}
          </AppText>
        )}
      </AvoidKeyboardComponent>
    </ContainerView>
  );
};

export default Login;
