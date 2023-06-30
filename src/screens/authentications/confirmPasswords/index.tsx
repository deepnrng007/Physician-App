import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import {
  AppText,
  ContainerView,
  TextInputComponent,
} from "../../../components";
import LoginButton from "../../../components/baseComponents/loginButton";
import PasswordValidationChecks from "../../../components/blockComponents/paswordValidationChecks";
import { langVar, screenNames, translate } from "../../../enums";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import {
  GradientBGImage,
  KeyIcon,
  PwdChangedIcon,
} from "../../../utils/imagePaths";
import { alertBox } from "../../../utils/utils";
import {
  hasLowerCase,
  hasNumber,
  hasSpeialCase,
  hasUpperCase,
  length8Char,
} from "../../../utils/validations";
import { updateConfirmPwd } from "../helper";
import styles from "./styles";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.CONFIRMPASSWORD
>;

const validationList = [
  { check: false, label: translate.t(langVar.minLength8) },
  { check: false, label: translate.t(langVar.requirednumber) },
  { check: false, label: translate.t(langVar.requiredUpperCase) },
  { check: false, label: translate.t(langVar.requiredlowerCase) },
  { check: false, label: translate.t(langVar.requiredSpecialCase) },
];

const ConfirmPasswords = ({ navigation, route }: Props) => {
  const { params: { resetData } = {} } = route;
  const { userName, code } = resetData;

  const [newPassword, setNewPassword] = useState("");
  const [seconds, setSeconds] = useState(3);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  let subscribe: any = null;
  const validate = () => {
    return validationList.every((item) => item.check === true);
  };

  const checkValidationList = (text: string) => {
    if (length8Char(text)) validationList[0].check = true;
    else validationList[0].check = false;
    if (hasNumber(text)) validationList[1].check = true;
    else validationList[1].check = false;
    if (hasUpperCase(text)) validationList[2].check = true;
    else validationList[2].check = false;
    if (hasLowerCase(text)) validationList[3].check = true;
    else validationList[3].check = false;
    if (hasSpeialCase(text)) validationList[4].check = true;
    else validationList[4].check = false;
  };

  useEffect(() => {
    //onClickConfirmPassword();
    return () => {
      if (subscribe) clearInterval(subscribe);
    };
  }, []);

  function updateTimer() {
    setSeconds((seconds) => {
      if (seconds === 0) {
        clearInterval(subscribe);
        navigation.replace(screenNames.LOGIN);
      }
      return seconds - 1;
    });
  }

  const onClickConfirmPassword = async () => {
    setIsError(false);
    setLoading(true);
    const params = {
      userName,
      password: newPassword,
      confirmPassword: newPassword,
      code,
    };
    const res = await updateConfirmPwd(params);
    if (res.isValid) {
      setLoading(false);
      setIsSuccess(true);
      subscribe = setInterval(() => {
        updateTimer();
      }, 1000);
    } else {
      setLoading(false);
      setIsError(true);
      if (res.errorMessage.includes("reset token"))
        alertBox(translate.t(langVar.otpSessionExpired), () =>
          navigation.navigate(screenNames.LOGIN)
        );
      else alertBox(res.errorMessage);
    }
  };

  const onTextChange = (text: string) => {
    setNewPassword(text);
    checkValidationList(text);
  };
  return (
    <ContainerView
      style={{ flex: 1 }}
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

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <AppText style={styles.titleName}>
            {translate.t(langVar.resetPassword)}
          </AppText>
          <TextInputComponent
            isError={isError}
            secureTextEntry
            onTextChange={onTextChange}
            label={translate.t(langVar.newPwd)}
            placeholder={translate.t(langVar.enterNewPwd)}
            Icon={KeyIcon}
          />
          {isSuccess ? (
            <>
              <View style={[styles.validation]}>
                <>
                  <PwdChangedIcon />
                  <AppText style={styles.successLabel}>
                    {translate.t(langVar.pwdChanged)}
                  </AppText>
                </>
              </View>
              <AppText style={styles.direction}>
                {translate.t(langVar.redirecting)}:{" "}
                <AppText style={styles.seconds}>{seconds}</AppText>{" "}
                {translate.t(langVar.seconds)}
              </AppText>
            </>
          ) : (
            <View style={[styles.validation, { alignSelf: "flex-start" }]}>
              <PasswordValidationChecks list={validationList} />
            </View>
          )}
        </View>

        {!isSuccess && (
          <LoginButton
            style={{
              width: "100%",
            }}
            loading={loading}
            onPress={() => (validate() ? onClickConfirmPassword() : {})}
            label={translate.t(langVar.confirm)}
            enable={validate()}
          />
        )}
      </View>
    </ContainerView>
  );
};

export default ConfirmPasswords;
