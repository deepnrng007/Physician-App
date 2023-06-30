import { View, ViewStyle, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import RNOtpVerify from "react-native-otp-verify";
import styles from "./styles";
import logger from "../../../utils/logger";
import { isAndroid } from "../../../utils/utils";
import { themes } from "../../../enums";
import { getOTPfromMessage } from "../../../utils/validations";

type props = {
  style?: ViewStyle;
  codeInputFieldStyle?: ViewStyle;
  onCodeFilled: any;
  isError: boolean;
};
const OTPInputComponent = ({
  style,
  codeInputFieldStyle,
  onCodeFilled,
  isError,
}: props) => {
  const [otp, setOtp] = useState("");
  const getHash = () => {
    RNOtpVerify.getHash()
      .then((code) => logger.log("hash code :", code))
      .catch((error) => logger.log("hash code error :", error));
  };

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(otpHandler))
      .catch((p) => console.log(p));

  const otpHandler = (message: string) => {
    const otp = getOTPfromMessage(message);
    if (otp) {
      setOtp(otp);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  };
  useEffect(() => {
    if (isAndroid()) {
      getHash();
      startListeningForOtp();
      return () => RNOtpVerify.removeListener();
    }
  }, []);

  return (
    <View>
      <OTPInputView
        pinCount={4}
        code={otp ? otp : undefined}
        autoFocusOnLoad={false}
        keyboardType={"number-pad"}
        style={[styles.otpContainer, style] as ViewStyle}
        codeInputFieldStyle={
          [
            styles.inputFieldStyle,
            codeInputFieldStyle,
            isError && { color: themes.Red4 },
          ] as ViewStyle
        }
        onCodeFilled={onCodeFilled}
      />
    </View>
  );
};

export default OTPInputComponent;
