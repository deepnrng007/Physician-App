import { View, ViewStyle, TextStyle } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppText,
  ContainerView,
  OTPInputComponent,
  AppButton,
  Loader,
} from "../../../components";
import { GradientBGImage, RightArrowLineIcon } from "../../../utils/imagePaths";
import { langVar, screenNames, themes, translate } from "../../../enums";
import styles from "./styles";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { countDownTimer, getMaskedNumber } from "../../../utils/utils";
import { getOTP, getValidateOTP } from "../helper";
import { scale } from "react-native-size-matters";
import BackgroundTimer from "react-native-background-timer";
import { useFocusEffect } from "@react-navigation/core";

type Props = NativeStackScreenProps<RootStackParams, screenNames.OTPSCREEN>;

const TIME = 599;
const ZEROTIMEFORMAT = "00:00";
const OTPScreen = ({ navigation, route }: Props) => {
  const refff = useRef<any>();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { params: { resetData } = {} } = route;
  const { phoneNUmber = "", userName = "", code = "" } = resetData;
  const [resendCode, setResendCode] = useState(code);

  const [timer, setTimer] = useState("10:00");

  const onCodeFilled = async (code: string) => {
    setIsError(false);
    setLoading(true);
    const params = {
      phoneNumber: phoneNUmber,
      verificationCode: code,
    };
    const res = await getValidateOTP(params);
    if (res.result) {
      clearTimer();
      setLoading(false);
      navigation.navigate(screenNames.CONFIRMPASSWORD, {
        resetData: {
          ...resetData,
          code: resendCode,
        },
      });
    } else {
      setLoading(false);
      setIsError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => clearTimer();
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      refff.current = countDownTimer(TIME, (time: number, timer: string) => {
        setTimer(() => timer);
      });
    }, 200);
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (timer === ZEROTIMEFORMAT) {
      clearTimer();
    }
  }, [timer]);

  const clearTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  const resentOTP = async () => {
    setIsError(false);
    setLoading(true);
    const res: any = await getOTP(userName);
    if (res.succeeded) {
      setLoading(false);
      setResendCode(res.code);
      refff.current = countDownTimer(TIME, (time: number, timer: string) => {
        setTimer(timer);
      });
    } else {
      setLoading(false);
      setIsError(true);
    }
  };

  return (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      backArrowStyle={styles.backArrow as ViewStyle}
    >
      <View
        style={{
          position: "absolute",
        }}
      >
        <GradientBGImage />
      </View>

      <AppText style={styles.titleName}>
        {translate.t(langVar.resetPassword)}
      </AppText>
      <View style={styles.otpInputContainer}>
        <AppText style={styles.enterOtp}>
          {translate.t(langVar.enterOtp)} {getMaskedNumber(phoneNUmber)}
        </AppText>
        <OTPInputComponent
          style={styles.otpInput as ViewStyle}
          onCodeFilled={onCodeFilled}
          isError={isError}
        />
        {timer !== ZEROTIMEFORMAT ? (
          <AppText style={styles.enterOtp}>
            {`${translate.t(langVar.codeExpiredIn)}`}
            <AppText style={[styles.timer]}>{` ${timer} `}</AppText>
            {translate.t(langVar.seconds)}
          </AppText>
        ) : (
          <AppButton style={{ alignSelf: "flex-end" }} onPress={resentOTP}>
            <AppText style={styles.textStyle as TextStyle}>
              {translate.t(langVar.resend)} <RightArrowLineIcon />
            </AppText>
          </AppButton>
        )}
        {loading && (
          <View style={{ marginTop: scale(50) }}>
            <Loader loaderColor={themes.gray20} />
          </View>
        )}
      </View>
    </ContainerView>
  );
};

export default OTPScreen;
