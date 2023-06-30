import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, View, ViewStyle } from "react-native";
import {
  ContainerView,
  AppText,
  TextInputComponent,
} from "../../../components";
import LoginButton from "../../../components/baseComponents/loginButton";
import { langVar, screenNames, translate } from "../../../enums";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { GradientBGImage } from "../../../utils/imagePaths";
import { isFieldEmpty } from "../../../utils/validations";
import { getOTP } from "../helper";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.RESETPASSWORD>;

const ResetPassword = ({ navigation }: Props) => {
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (isFieldEmpty(userName)) return false;
    else return true;
  };

  const navigateTo = async () => {
    setIsError(false);
    setLoading(true);
    const res: any = await getOTP(userName);
    if (res.succeeded) {
      setLoading(false);
      navigation.navigate(screenNames.OTPSCREEN, {
        resetData: {
          ...res,
          userName,
        },
      });
    } else {
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    setUserName("");
  }, []);

  const onTextChange = (text: string) => {
    setIsError(false);
    setUserName(text);
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
      <View style={styles.inputContainer}>
        <TextInputComponent
          placeholder={"johndoe01"}
          isError={isError}
          label={translate.t(langVar.userName)}
          //keyboardType={"number-pad"}
          style={styles.inputText}
          onTextChange={onTextChange}
        />
      </View>
      <AppText style={styles.labelText}>
        {translate.t(langVar.otpWillSendProvidedUserName)}
      </AppText>
      <LoginButton
        label={translate.t(langVar.sendOtp)}
        enable={validate()}
        loading={loading}
        onPress={() => (validate() ? navigateTo() : {})}
        removeIcon
      />
    </ContainerView>
  );
};

export default ResetPassword;
