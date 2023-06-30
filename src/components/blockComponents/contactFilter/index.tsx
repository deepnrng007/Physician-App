import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { themes } from "../../../enums";

type ContactFilterProps = {
  style?: ViewStyle;
  title: string;
  list: any[];
  onTypeSelected: any;
  selected: string;
};

const ContactFilter = ({
  style,
  list,
  onTypeSelected,
  selected,
}: ContactFilterProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.badgeContainer}>
        {list &&
          list.map((item, index) => {
            const { label, Count, value } = item;
            return (
              <AppButton
                key={index}
                onPress={() => onTypeSelected(value)}
                style={
                  [
                    styles.badge,
                    {
                      backgroundColor:
                        selected === value ? themes.green4 : themes.White,
                    },
                  ] as ViewStyle
                }
              >
                <AppText
                  style={[
                    styles.badegeLabel,
                    {
                      color: selected === value ? themes.White : themes.Black1,
                    },
                  ]}
                >{`${label} (${Count})`}</AppText>
              </AppButton>
            );
          })}
      </View>
    </View>
  );
};

export default ContactFilter;
