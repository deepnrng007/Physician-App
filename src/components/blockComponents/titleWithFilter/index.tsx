import { View, TextStyle, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppButton from "../../baseComponents/appButton";
import { FilterIcon } from "../../../utils/imagePaths";
import TitleIconCount from "../titleIconCount";
import DotSymbol from "../../baseComponents/dotSymbol";

type TitleWithFilterProps = {
  count: number;
  style: ViewStyle;
  openFilterPanel: () => void;
  title: string;
  pendingNotification: boolean;
  testID?: string;
};

const TitleWithFilter = ({
  title,
  count,
  style,
  openFilterPanel,
  pendingNotification,
  testID,
}: TitleWithFilterProps) => {
  return (
    <View
      testID={testID}
      accessibilityLabel={testID}
      style={[styles.container, style]}
    >
      {/* <AppText style={styles.title}>{`${translate.t(
        langVar.episodeTab
      )} (${count})`}</AppText> */}
      <TitleIconCount
        title={title}
        count={count}
        textStyle={styles.title as TextStyle}
      />
      <AppButton onPress={openFilterPanel}>
        {pendingNotification && (
          <DotSymbol isNotificationDot={pendingNotification} />
        )}
        <FilterIcon />
      </AppButton>
    </View>
  );
};

export default TitleWithFilter;

TitleWithFilter.defaultProps = {
  count: 0,
  style: {},
  openFilterPanel: () => {},
  pendingNotification: false,
};
