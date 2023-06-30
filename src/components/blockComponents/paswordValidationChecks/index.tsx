import { View, Text } from "react-native";
import React from "react";
import { AppText } from "../..";
import { DotIcon, GreenTickIcon } from "../../../utils/imagePaths";
import styles from "./styles";
import { themes } from "../../../enums";

type props = {
  list: {
    check: boolean;
    label: string;
  }[];
};

const PasswordValidationChecks = ({ list }: props) => {
  return (
    <View>
      {list &&
        list.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.row}>
              {item.check ? <GreenTickIcon /> : <DotIcon />}
              <AppText
                style={[styles.label, item.check && { color: themes.Black }]}
              >
                {item.label}
              </AppText>
            </View>
          );
        })}
    </View>
  );
};

export default PasswordValidationChecks;
