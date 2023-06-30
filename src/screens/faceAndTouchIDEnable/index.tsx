import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { AppText, ContainerView, EnabledTouchIDModal } from "../../components";
import { langVar, screenNames, themes, translate } from "../../enums";
import { encriptedStorageKeys } from "../../enums/constants";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
} from "../../utils/encryptedStorage";
import { FaceTouchIdsIcon } from "../../utils/imagePaths";
import styles from "./styles";

const FaceAndTouchIDEnable = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [popupEnable, setpopupEnable] = useState(false);
  const navigation = useNavigation<any>();
  useEffect(() => {
    checkToggleValue();
  }, []);

  const checkToggleValue = async () => {
    const res = await getEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
    if (res) setIsEnabled(true);
  };
  const toggleSwitch = async (flag: boolean) => {
    setTimeout(() => {
      setpopupEnable(true);
    }, 300);
    setIsEnabled(flag);
    if (flag)
      await setEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID, {
        success: true,
      });
    else await removeEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
  };

  const navigateTo = () => {
    setpopupEnable(false);
    navigation.navigate(screenNames.HOME);
  };

  return (
    <ContainerView
      enableSafeArea
      headerName={translate.t(langVar.faceAndTouchID)}
      isBackRequired
    >
      <EnabledTouchIDModal
        visible={popupEnable}
        onClose={() => {}}
        enabled={isEnabled}
        navigateTo={navigateTo}
      />
      <View style={styles.faceidTouchIdIcon}>
        <FaceTouchIdsIcon />
      </View>
      <View style={styles.row}>
        <AppText style={styles.label} allowFontScaling numberOfLines={1}>
          {translate.t(langVar.enableTouchID)}
        </AppText>
        <Switch
          trackColor={{
            false: "rgba(120, 120, 128, 0.16)",
            true: themes.green,
          }}
          ios_backgroundColor="rgba(120, 120, 128, 0.16)"
          thumbColor={themes.White}
          onValueChange={() => toggleSwitch(!isEnabled)}
          value={isEnabled}
        />
      </View>
      <AppText style={styles.description}>
        {translate.t(langVar.enableTouchIdDesc)}
      </AppText>
    </ContainerView>
  );
};

export default FaceAndTouchIDEnable;
