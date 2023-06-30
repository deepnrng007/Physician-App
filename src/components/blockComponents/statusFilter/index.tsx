import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { Checkbox } from "react-native-paper";
import { themes } from "../../../enums";

type StatusFilterProps = {
  style?: ViewStyle;
  title: string;
  list: any[];
  onSelected?: any;
  selectedList: string[];
};

const StatusFilter = ({
  style,
  title,
  list,
  onSelected,
  selectedList,
}: StatusFilterProps) => {
  const [checkedNames, setCheckedNames] = useState<string[]>([]);

  useEffect(() => {
    setCheckedNames(selectedList);
  }, [selectedList]);

  const onCheckBoxClick = (value: string) => {
    if (!checkedNames.includes(value)) {
      setCheckedNames([...checkedNames, value]);
      onSelected([...checkedNames, value]);
    } else {
      const arr = checkedNames.filter((item) => item !== value);
      setCheckedNames(arr);
      onSelected(arr);
    }
  };

  return (
    <View style={[style]}>
      <AppText style={styles.title}>{title}</AppText>
      <View>
        {list &&
          list.map((item, index) => {
            return (
              <AppButton
                key={index}
                onPress={() => onCheckBoxClick(item)}
                style={styles.checkboxLabel}
              >
                <Checkbox.Android
                  color={themes.green}
                  uncheckedColor={themes.LightGreen2}
                  status={checkedNames.includes(item) ? "checked" : "unchecked"}
                />
                <AppText style={styles.statusLabel}>{item.DisplayName}</AppText>
              </AppButton>
            );
          })}
      </View>
    </View>
  );
};

export default StatusFilter;
