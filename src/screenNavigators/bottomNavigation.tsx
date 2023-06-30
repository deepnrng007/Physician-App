import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { langVar, screenNames, translate } from "../enums";
import {
  HomeIconActive,
  TocTabIconInactive,
  EpisodeTabInactive,
  EpisodeIconActive,
  HomeIconInactive,
  TocTabIconActive,
} from "../utils/imagePaths";
import { View, ViewStyle } from "react-native";

import styles from "./styles";
import { AppText, ContainerView, DotSymbol, Header } from "../components";
import { EpisodeList, Home, TocsList } from "../screens";
import { isAndroid } from "../utils/utils";

export type bottomNavigationParams = {
  HOME: undefined;
  EPISODELIST: undefined;
  TOCSLIST: undefined;
};

const BottomTabs = createMaterialBottomTabNavigator<bottomNavigationParams>();

const BottomNavigation = () => {
  return (
    <ContainerView hideStatusSpacer style={styles.container as ViewStyle}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <BottomTabs.Navigator
        keyboardHidesNavigationBar={isAndroid() ? true : false}
        barStyle={styles.barStyle}
      >
        <BottomTabs.Screen
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? (
                  <>
                    <HomeIconActive />
                    <DotSymbol style={styles.activeDot as ViewStyle} />
                    <AppText style={styles.tabLabel}>
                      {translate.t(langVar.homeTab)}
                    </AppText>
                  </>
                ) : (
                  <>
                    <HomeIconInactive />
                    <DotSymbol style={styles.dotStyle as ViewStyle} />
                    <AppText style={[styles.tabLabel, styles.tabLabelInactive]}>
                      {translate.t(langVar.homeTab)}
                    </AppText>
                  </>
                )}
              </View>
            ),
          }}
          name={screenNames.HOME}
          component={Home}
        />
        <BottomTabs.Screen
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? (
                  <>
                    <EpisodeIconActive />
                    <DotSymbol style={styles.activeDot as ViewStyle} />
                    <AppText style={styles.tabLabel}>
                      {translate.t(langVar.episodeTab)}
                    </AppText>
                  </>
                ) : (
                  <>
                    <EpisodeTabInactive />
                    <DotSymbol style={styles.dotStyle as ViewStyle} />
                    <AppText style={[styles.tabLabel, styles.tabLabelInactive]}>
                      {translate.t(langVar.episodeTab)}
                    </AppText>
                  </>
                )}
              </View>
            ),
          }}
          name={screenNames.EPISODELIST}
          component={EpisodeList}
        />
        <BottomTabs.Screen
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? (
                  <>
                    <TocTabIconActive />
                    <DotSymbol style={styles.activeDot as ViewStyle} />
                    <AppText style={styles.tabLabel}>
                      {translate.t(langVar.tocTab)}
                    </AppText>
                  </>
                ) : (
                  <>
                    <TocTabIconInactive />
                    <DotSymbol style={styles.dotStyle as ViewStyle} />
                    <AppText style={[styles.tabLabel, styles.tabLabelInactive]}>
                      {translate.t(langVar.tocTab)}
                    </AppText>
                  </>
                )}
              </View>
            ),
          }}
          name={screenNames.TOCSLIST}
          component={TocsList}
        />
      </BottomTabs.Navigator>
    </ContainerView>
  );
};

export default BottomNavigation;
