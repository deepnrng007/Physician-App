/* This is component for showing
NavigationHeader, NavigationItems, NavigationFooter Views. */

import React, { useState } from "react";
import { View } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerElement from "../drawerElement";
import { AppButton } from "../..";
import {
  AboutEnavIcon,
  CloseIcon,
  ContactIcon,
  ScannerIcon,
} from "../../../utils/imagePaths";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import UserInfoCard from "../userInfoCard";
import { DrawerContentProps } from "./types";
import { langVar, screenNames, translate } from "../../../enums";
import { scale } from "react-native-size-matters";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import useAppSelector from "../../customHooks/useAppSelector";
import { DeviceEventEmitter } from "react-native";
import { eventNames } from "../../../enums/constants";
import { unBindTwilioNotication } from "../../../screens/helper";

type navigationProps = NativeStackNavigationProp<
  RootStackParams,
  screenNames.DRAWERNAVIGATION
>;

const DrawerContent = ({ props }: DrawerContentProps) => {
  const navigation = useNavigation<navigationProps>();
  const { loginDetails = {} } = useAppSelector((state) => state.login);
  const { firstName = "", lastName = "" } = loginDetails ? loginDetails : {};

  const signOut = async () => {
    await unBindTwilioNotication();
    DeviceEventEmitter.emit(eventNames.LOG_OUT_EVENT);
  };

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <AppButton style={styles.closeButton} onPress={closeDrawer}>
        <CloseIcon height={scale(33)} width={scale(33)} />
      </AppButton>
      <View style={styles.navigationHeaderView}>
        <UserInfoCard
          loading={false}
          userName={`${firstName} ${lastName}`}
          onClickSignout={() => signOut()}
        />
      </View>
      <View style={[styles.drawerElementView, { marginTop: scale(30) }]}>
        <DrawerElement
          DrawerIcon={ContactIcon}
          label={translate.t(langVar.PatineNavcontacts)}
          onNavigate={() => {
            closeDrawer();
            navigation.navigate(screenNames.CONTACT);
          }}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          DrawerIcon={ScannerIcon}
          label={translate.t(langVar.faceAndTouchID)}
          onNavigate={() => {
            closeDrawer();
            navigation.navigate(screenNames.FACEIDTOUCHIDENABLE);
          }}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          DrawerIcon={AboutEnavIcon}
          label={translate.t(langVar.aboutEnavProvider)}
          onNavigate={() => {
            closeDrawer();
            navigation.navigate(screenNames.ABOUTENAVPROVIDER);
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
