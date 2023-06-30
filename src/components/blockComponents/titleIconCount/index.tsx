import { TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../../baseComponents/appText";

type TitleIconCountProps = {
  Icon?: any;
  title?: string;
  count?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};
const TitleIconCount = ({
  Icon,
  title,
  count,
  style,
  textStyle,
}: TitleIconCountProps) => {
  const isIconAvailable = () => (Icon ? true : false);

  return title ? (
    <View style={[styles.titleIcon, style]}>
      {Icon && <Icon />}
      <AppText
        style={[
          styles.title,
          { paddingLeft: !isIconAvailable() ? 0 : 10 },
          textStyle,
        ]}
      >
        {title}
      </AppText>
      <View style={styles.counterView}>
        <AppText style={styles.counter}>{count}</AppText>
      </View>
    </View>
  ) : null;
};

export default TitleIconCount;

TitleIconCount.default = {
  title: "",
  Icon: <> </>,
  count: 0,
};
