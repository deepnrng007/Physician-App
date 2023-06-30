import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import FilterPanel from "../filterPanel";
import { AppText, CalenderPicker } from "../..";
import styles from "./styles";
import { langVar, translate } from "../../../enums";
import LocationFilter from "../locationFilter";
import { notifyMsg } from "../../../utils/utils";
import { scale } from "react-native-size-matters";

type TocFiltersProps = {
  visible: boolean;
  style?: ViewStyle;
  onDismiss: any;
  onFilterApply: any;
  onFilterClear?: any;
  filteredData: any;
  locationList: any[];
};

const TocFilters = ({
  visible,
  onDismiss,
  onFilterApply,
  onFilterClear,
  filteredData,
  locationList,
}: TocFiltersProps) => {
  const [filteredLocation, setFilteredLocation] = useState<any>(
    locationList[0]
  );
  const [dateRange, setDateRange] = useState<any>([]);
  const [endDate, setEndDate] = useState<any>([]);

  const filterApplied = () => {
    if (filteredLocation) {
      const filters = {
        location: filteredLocation,
        dateRange: dateRange,
        endDate: endDate,
      };
      onFilterApply(filters);
    } else notifyMsg("Please Apply the Filter");
  };

  useEffect(() => {
    if (filteredData) {
      const { dateRange, endDate, location } = filteredData;
      setDateRange(dateRange);
      setEndDate(endDate);
      setFilteredLocation(location);
    }
  }, [filteredData]);

  const filterCleared = () => {
    setDateRange([]);
    setEndDate([]);
    setFilteredLocation;
    onFilterClear(null);
  };

  const onEndDateSelected = (startDate: string, endDate: string) => {
    setEndDate([startDate, endDate]);
  };
  const onStartEndDateSelected = (startDate: string, endDate: string) => {
    setDateRange([startDate, endDate]);
  };

  const onLocationSelected = (location: string) => {
    setFilteredLocation(location);
  };

  return (
    <View>
      {visible && (
        <FilterPanel
          onDismiss={onDismiss}
          onFilterApply={filterApplied}
          onFilterClear={filterCleared}
        >
          <AppText style={[styles.calenderTitle, styles.dateRangeLabel]}>
            {translate.t(langVar.dischargeDateRange)}
          </AppText>
          <View style={styles.calenderContainer}>
            <CalenderPicker
              isRangeSelect
              canderContainerStyle={styles.rangeDate as ViewStyle}
              selectedDates={dateRange}
              datePlaceHolder={"MM/DD/YYYY - MM/DD/YYYY"}
              onSelectDate={onStartEndDateSelected}
            />
          </View>
          <CalenderPicker
            isRangeSelect
            canderContainerStyle={
              [styles.rangeDate, { marginTop: scale(30) }] as ViewStyle
            }
            title={translate.t(langVar.endDate)}
            selectedDates={endDate}
            datePlaceHolder={"MM/DD/YYYY - MM/DD/YYYY"}
            onSelectDate={onEndDateSelected}
          />
          <LocationFilter
            selected={filteredLocation}
            style={styles.locationContainer as ViewStyle}
            badgeContainerStyle={styles.badgeContainer as ViewStyle}
            title={translate.t(langVar.status)}
            onLocationSelected={onLocationSelected}
            list={locationList}
          />
        </FilterPanel>
      )}
    </View>
  );
};

export default TocFilters;
