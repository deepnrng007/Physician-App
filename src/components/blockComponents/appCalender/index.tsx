import { Modal, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import styles from "./styles";
import {
  alertBox,
  getDatesBetweetTwoDates,
  getSingleDateStyle,
} from "../../../utils/utils";
import { themes } from "../../../enums";
import AppButton from "../../baseComponents/appButton";

type AppCalenderProps = {
  onDateSelected: any;
  visible: boolean;
  onClose: any;
  isRangeSelect: boolean;
  dates: any[];
};

const AppCalender = ({
  onDateSelected,
  visible,
  onClose,
  isRangeSelect,
  dates,
}: AppCalenderProps) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setendDate] = useState<any>(null);

  const selectDates = (selectedDate: any) => {
    const selected = selectedDate.dateString;
    if (!endDate) {
      if (isRangeSelect) {
        if (!startDate) {
          setStartDate(selected);
        } else if (!endDate) {
          if (startDate !== selected) {
            setendDate(selected);
            onDateSelected(startDate, selected);
          } else alertBox("Please select different start and end dates");
        }
      } else {
        setStartDate(selected);
        onDateSelected(selected);
      }
    } else {
      setendDate(null);
      setStartDate(selected);
    }
  };

  useEffect(() => {
    if (isRangeSelect) {
      setStartDate(dates[0]);
      setendDate(dates[1]);
    } else {
      setStartDate(dates[0]);
    }
  }, []);
  return (
    <Modal visible={visible} transparent={true}>
      <AppButton onPress={onClose} style={styles.container as ViewStyle}>
        <Calendar
          markingType={"custom"}
          current={dates[0]}
          minDate={startDate && !endDate ? startDate : null}
          markedDates={
            isRangeSelect
              ? getDatesBetweetTwoDates(startDate, endDate)
              : getSingleDateStyle(startDate)
          }
          style={styles.calenderStyle}
          onDayPress={selectDates}
          theme={{
            textDayFontFamily: themes.MontserratSemiBoldFont,
            textMonthFontFamily: themes.MontserratSemiBoldFont,
            textDayHeaderFontFamily: themes.MontserratSemiBoldFont,
            monthTextColor: themes.DarkGray,
            dayTextColor: themes.DarkGray,
            arrowColor: themes.calenderArrowColor,
            textDayHeaderFontWeight: "600",
            textSectionTitleDisabledColor: "#d9e1e8",
            todayTextColor: themes.darkGray,
          }}
        />
      </AppButton>
    </Modal>
  );
};

export default AppCalender;

AppCalender.defaultProps = {
  visible: false,
};
