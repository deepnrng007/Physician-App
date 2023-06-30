import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { themes } from "../../../enums";

type LocationFilterProps = {
  style?: ViewStyle;
  title: string;
  list: any[];
  onLocationSelected: any;
  selected: any;
  badgeContainerStyle?: ViewStyle;
};

const LocationFilter = ({
  style,
  title,
  list,
  onLocationSelected,
  selected,
  badgeContainerStyle,
}: LocationFilterProps) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title}>{title}</AppText>
      <View style={[styles.badgeContainer, badgeContainerStyle]}>
        {list &&
          list.map((item, index) => {
            const { DisplayName, Count } = item;
            return (
              <AppButton
                key={index}
                onPress={() => onLocationSelected(item)}
                style={
                  [
                    styles.badge,
                    selected && selected.DisplayName === DisplayName
                      ? { backgroundColor: themes.green4, borderWidth: 0 }
                      : { backgroundColor: themes.White },
                  ] as ViewStyle
                }
              >
                <AppText
                  style={[
                    styles.badegeLabel,
                    {
                      color:
                        selected && selected.DisplayName === DisplayName
                          ? themes.White
                          : themes.Black1,
                    },
                  ]}
                >{`${DisplayName} (${Count})`}</AppText>
              </AppButton>
            );
          })}
      </View>
    </View>
  );
};

export default LocationFilter;
