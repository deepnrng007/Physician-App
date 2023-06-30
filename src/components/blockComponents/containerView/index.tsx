import React from "react";
import { View, FlatList, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Oval } from "../../../utils/imagePaths";

import ErrorBox from "../../baseComponents/errorBox";
import Loader from "../../baseComponents/loader";
import NavigationHeader from "../navigationHeader";
import styles from "./styles";

const ContainerView = ({
  isScrollEnable,
  children,
  style,
  loading,
  errorMessage,
  isBackRequired,
  headerName,
  isOvalRequired,
  backArrowStyle,
  enableSafeArea,
  safeContainer,
  customGoBack,
}: ContainerViewProps) => {
  const renderScreen = () => {
    if (loading) {
      return (
        <View style={styles.loadingView}>
          <Loader />
        </View>
      );
    } else if (isScrollEnable) {
      return (
        <FlatList
          bounces={false}
          data={[{}]}
          contentContainerStyle={[styles.container, style]}
          renderItem={() => <View>{children}</View>}
          nestedScrollEnabled
          keyboardShouldPersistTaps={"always"}
        />
      );
    } else return <View style={[styles.container, style]}>{children}</View>;
  };

  const renderMainUI = () => {
    return (
      <>
        {isBackRequired && (
          <NavigationHeader
            style={[styles.navigationHeader, backArrowStyle] as ViewStyle}
            navigationTitle={headerName}
            customGoBack={customGoBack}
          />
        )}
        {errorMessage && <ErrorBox value={errorMessage} />}
        {isOvalRequired && (
          <View style={styles.ovalStyle}>
            <Oval />
          </View>
        )}
        {renderScreen()}
      </>
    );
  };
  return enableSafeArea ? (
    <SafeAreaView style={[styles.safeContainer, safeContainer]}>
      {renderMainUI()}
    </SafeAreaView>
  ) : (
    <View style={[styles.safeContainer]}>{renderMainUI()}</View>
  );
};

export default ContainerView;

interface ContainerViewProps {
  children: React.ReactNode;
  isScrollEnable: boolean;
  loading: boolean;
  style: ViewStyle;
  errorMessage: null | string;
  hideStatusSpacer: boolean;
  isBackRequired: boolean;
  headerName?: string;
  isOvalRequired: boolean;
  backArrowStyle?: ViewStyle;
  enableSafeArea?: boolean;
  safeContainer?: ViewStyle;
  customGoBack?: string;
}

ContainerView.defaultProps = {
  isScrollEnable: false,
  children: <>/</>,
  style: {},
  loading: false,
  errorMessage: null,
  hideStatusSpacer: false,
  isBackRequired: false,
  isOvalRequired: false,
  enableSafeArea: true,
};
