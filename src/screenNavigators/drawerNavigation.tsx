import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import styles from "../screenNavigators/styles";
import DrawerContent from "../components/blockComponents/drawerContent";
import { screenNames } from "../enums";
import BottomNavigation from "./bottomNavigation";

export type drawerNavigationParams = {
  BOTTOMNAVIGATION: undefined;
};

const Drawer = createDrawerNavigator<drawerNavigationParams>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: styles.drawerStyles,
      }}
      drawerContent={(props) => {
        return <DrawerContent props={props} />;
      }}
    >
      <Drawer.Screen
        name={screenNames.BOTTOMNAVIGATION}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
