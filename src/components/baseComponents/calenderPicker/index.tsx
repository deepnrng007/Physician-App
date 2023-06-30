import { View, TextInput, ViewStyle } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import AppText from "../appText";
import { CalenderIcon } from "../../../utils/imagePaths";
import AppButton from "../appButton";
import { scale } from "react-native-size-matters";
import AppCalender from "../../blockComponents/appCalender";
import { themes } from "../../../enums";
import { getDateFormat } from "../../../utils/utils";

type CalenderPickerProps = {
  title?: string;
  onSelectDate?: any;
  selectedDates: any[];
  calenderboxStyle?: ViewStyle;
  canderContainerStyle?: ViewStyle;
  datePlaceHolder: string;
  isRangeSelect: boolean;
};

const CalenderPicker = ({
  title,
  onSelectDate,
  selectedDates,
  calenderboxStyle,
  canderContainerStyle,
  datePlaceHolder,
  isRangeSelect,
}: CalenderPickerProps) => {
  const [openCalender, setOpenCalender] = useState(false);

  const onClickCalenderOpen = () => {
    setOpenCalender(true);
  };
  const getDates = (startDarte: string, endDate: string) => {
    setOpenCalender(false);
    onSelectDate(startDarte, endDate);
  };
  const closeCalender = () => {
    setOpenCalender(false);
  };

  const getDateValues = () => {
    if (!selectedDates[0]) {
      return "";
    } else if (selectedDates.length === 1) {
      return selectedDates[0];
    } else {
      return `${getDateFormat(
        selectedDates[0],
        "MM/DD/YYYY"
      )} - ${getDateFormat(selectedDates[1], "MM/DD/YYYY")}`;
    }
  };

  return (
    <AppButton
      onPress={onClickCalenderOpen}
      style={[styles.container, canderContainerStyle] as ViewStyle}
    >
      {title && (
        <AppText style={[styles.calenderTitle, { marginBottom: scale(10) }]}>
          {title}
        </AppText>
      )}
      <View style={[styles.calenderBox, calenderboxStyle]}>
        <TextInput
          value={getDateValues()}
          editable={false}
          placeholder={datePlaceHolder}
          placeholderTextColor={themes.gray20Opacity40}
          style={styles.textInput}
        />
        <CalenderIcon />
      </View>
      {openCalender && (
        <AppCalender
          dates={selectedDates}
          isRangeSelect={isRangeSelect}
          visible={openCalender}
          onDateSelected={getDates}
          onClose={closeCalender}
        />
      )}
    </AppButton>
  );
};

export default CalenderPicker;

CalenderPicker.defaultProps = {
  onSelectDate: () => {},
  datePlaceHolder: "MM/DD/YYYY",
  isRangeSelect: false,
};
