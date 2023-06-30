import { View, ViewStyle } from "react-native";
import React from "react";
import AppButton from "../../baseComponents/appButton";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import {
  MenuHumburger,
  MessageBorderIcon,
  NotificationIcon,
} from "../../../utils/imagePaths";
import DotSymbol from "../../baseComponents/dotSymbol";
import { screenNames } from "../../../enums";

const Header = () => {
  const navigation = useNavigation<any>();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const navigateToMessages = () => {
    navigation.navigate(screenNames.ALLCHATMESSAGES);
  };
  const navigateToNotifcations = () => {
    navigation.navigate(screenNames.NOTIFICATIONS);
  };

  return (
    <View style={styles.container}>
      <AppButton onPress={openDrawer}>
        <MenuHumburger />
      </AppButton>
      <View style={[styles.container]}>
        {/* <AppButton
          style={styles.iconButton as ViewStyle}
          onPress={navigateToNotifcations}
        >
          <DotSymbol />
          <NotificationIcon />
        </AppButton> */}
        <AppButton onPress={navigateToMessages}>
          <DotSymbol />
          <MessageBorderIcon />
        </AppButton>
      </View>
    </View>
  );
};

export default Header;
