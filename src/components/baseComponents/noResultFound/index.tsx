import { View, ViewStyle } from "react-native";
import React from "react";
import AppText from "../appText";
import styles from "./styles";
import { scale } from "react-native-size-matters";

type props = {
  Icon: any;
  line1: string;
  line2?: string;
};

const NoResultFound = ({ Icon, line1, line2 }: props) => {
  return (
    <View style={styles.notfound as ViewStyle}>
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "70%" }}
      >
        <Icon width={scale(110)} height={scale(110)} />
        {line1 && (
          <AppText
            style={[
              styles.line1,
              line2 && { fontWeight: "700" },
              { marginTop: scale(5) },
            ]}
          >
            {line1}
          </AppText>
        )}
        {line2 && line2.length > 0 && (
          <AppText style={styles.line1}>{line2}</AppText>
        )}
      </View>
    </View>
  );
};

export default NoResultFound;
