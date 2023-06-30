import { View, ViewStyle, TextStyle } from "react-native";
import React, { useState } from "react";
import {
  AppButton,
  AppText,
  ContainerView,
  Loader,
  ModalLoader,
  useAppSelector,
} from "../../components";
import Pdf from "react-native-pdf";
import styles from "./styles";
import { langVar, screenNames, themes, translate } from "../../enums";
import { Checkbox } from "react-native-paper";
import { setEncryptedStorage } from "../../utils/encryptedStorage";
import { encriptedStorageKeys, eventNames } from "../../enums/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { updateTermsAndCondition } from "../helper";
import { alertBox } from "../../utils/utils";
import NavigationHeader from "../../components/blockComponents/navigationHeader";
import { scale } from "react-native-size-matters";
import { DeviceEventEmitter } from "react-native";
import { useDispatch } from "react-redux";
import { setLoginDetails } from "../../redux/slicers/loginSlice";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.PDFVIEWERSCREEN
>;

const PDFViewer = ({ navigation, route }: Props) => {
  const { url, showButtons = true, isBackRequired = true } = route.params;
  const [check, setCheck] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { loginDetails } = useAppSelector((state) => state.login);
  const dispatch = useDispatch();
  const signOut = async () => {
    DeviceEventEmitter.emit(eventNames.LOG_OUT_EVENT);
  };

  const accepted = async () => {
    if (check) {
      setLoading(true);
      const { userOwnerId } = loginDetails;
      try {
        const res = await updateTermsAndCondition(userOwnerId);
        if (res) {
          delete loginDetails["isAcceptedTermsAndConditions"];
          await setEncryptedStorage(
            encriptedStorageKeys.LOGINDETAILS,
            loginDetails
          );
          dispatch(setLoginDetails(loginDetails));
          setLoading(false);
          navigation.replace(screenNames.DRAWERNAVIGATION);
        }
      } catch (error) {
        setLoading(false);
        alertBox("Something went wrong. Please try again");
      }
    } else alertBox("Please agree to Terms & Conditions");
  };

  const onPageChanged = (currentPage: number) => {
    if (currentPage === totalPages) setEnableSubmit(true);
  };
  return (
    <ContainerView enableSafeArea style={styles.container}>
      <NavigationHeader
        style={{ marginLeft: scale(15) }}
        isBackRequired={isBackRequired}
        navigationTitle={translate.t(langVar.termsAndConditions)}
      />
      <ModalLoader visible={loading} />
      <Pdf
        trustAllCerts={false}
        style={styles.pdfViewer}
        source={{
          uri: url,
        }}
        onLoadComplete={setTotalPages}
        onPageChanged={onPageChanged}
        renderActivityIndicator={() => <Loader />}
      />
      {showButtons && (
        <View style={styles.acceptButtons}>
          <View style={styles.tickLabel}>
            <AppButton onPress={() => (enableSubmit ? setCheck(!check) : {})}>
              <Checkbox.Android
                disabled={!enableSubmit}
                color={themes.green}
                uncheckedColor={themes.LightGreen2}
                status={check ? "checked" : "unchecked"}
              />
            </AppButton>
            <AppText
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.label}
            >
              {translate.t(langVar.agreeTandC)}
              {" '"}
              <AppText style={[styles.label, styles.tandclabel]}>
                {`${translate.t(langVar.termsAndConditions)}`}
              </AppText>
              {"'"}
            </AppText>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton
              onPress={() => (enableSubmit ? accepted() : {})}
              text={translate.t(langVar.submit)}
              style={
                [
                  styles.submitButton,
                  !enableSubmit && styles.disableSubmit,
                ] as ViewStyle
              }
              textStyle={styles.btnlabel}
            />
            <AppButton
              onPress={signOut}
              text={translate.t(langVar.signout)}
              style={[styles.submitButton, styles.btnborder] as ViewStyle}
              textStyle={
                [styles.btnlabel, { color: themes.gray20 }] as TextStyle
              }
            />
          </View>
        </View>
      )}
    </ContainerView>
  );
};

export default PDFViewer;
