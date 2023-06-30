import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "../../baseComponents/appText";
import { langVar, translate } from "../../../enums";
import styles from "./styles";
import CalenderPicker from "../../baseComponents/calenderPicker";
import LocationFilter from "../locationFilter";
import StatusFilter from "../statusFilter";
import FilterPanel from "../filterPanel";

type EpisodeFilterProps = {
  locationList: any[];
  visible: boolean;
  onDismiss: () => void;
  onFilterApply: any;
  onFilterClear?: any;
  filteredData: any;
  intakeStatus: [];
};

const EpisodeFilter = ({
  locationList,
  visible,
  onDismiss,
  onFilterApply,
  onFilterClear,
  filteredData,
  intakeStatus,
}: EpisodeFilterProps) => {
  const [filteredLocation, setFilteredLocation] = useState<any>(
    locationList[0]
  );
  const [dateRange, setDateRange] = useState<any>([]);
  const [filterStatus, setFilterStatus] = useState<any[]>([]);

  const filterApplied = () => {
    const filterData = {
      location: filteredLocation,
      date: dateRange,
      status: filterStatus,
    };
    onFilterApply(filterData);
  };

  const filterCleared = () => {
    setDateRange([]);
    setFilteredLocation(null);
    setFilterStatus([]);
    onFilterClear(null);
  };

  const onSelectedStatus = (arr: any) => {
    setFilterStatus(arr);
  };

  useEffect(() => {
    if (filteredData) {
      const { date, location, status } = filteredData;
      setDateRange(date);
      setFilteredLocation(location);
      setFilterStatus(status);
    }
  }, [filteredData]);

  const onStartEndDateSelected = (startDate: string, endDate: string) => {
    setDateRange([startDate, endDate]);
  };

  const onLocationSelected = (location: any) => {
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
            {translate.t(langVar.procedureDateRange)}
          </AppText>
          <View style={styles.calenderContainer}>
            <CalenderPicker
              canderContainerStyle={styles.rangeDate as ViewStyle}
              selectedDates={dateRange}
              isRangeSelect
              datePlaceHolder={"MM/DD/YYYY - MM/DD/YYYY"}
              onSelectDate={onStartEndDateSelected}
            />
          </View>
          <LocationFilter
            selected={filteredLocation}
            onLocationSelected={onLocationSelected}
            style={styles.locationContainer}
            title={translate.t(langVar.locations)}
            list={locationList}
          />
          <StatusFilter
            style={styles.status}
            onSelected={onSelectedStatus}
            title={translate.t(langVar.status)}
            list={intakeStatus}
            selectedList={filterStatus}
          />
        </FilterPanel>
      )}
    </View>
  );
};

export default EpisodeFilter;

EpisodeFilter.defaultProps = {
  visible: false,
  onDismiss: () => {},
};
