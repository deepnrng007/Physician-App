import { View } from "react-native";
import React, { useState } from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import DropdownComponent from "../../../blockComponents/dropDown";
import ToCDaysInput from "../numberInput";
import { ErrorMessageIcon } from "../../../../utils/imagePaths";
import translate from "../../../../enums/languages/translate";
import { langVar } from "../../../../enums/languages/langVar";
import { themes } from "../../../../enums/themes";

type Props = {
  location: string;
  defaultDays?: string;
  isDisabled: boolean;
  showDropDown: any;
  selectedItems: any;
  testID?: string;
  type?: string;
  onChangeDays: any;
};
const LocationSelectionContainer = ({
  location,
  defaultDays,
  isDisabled,
  showDropDown,
  selectedItems,
  testID,
  type,
  onChangeDays,
}: Props) => {
  let selectedItem: any = null;
  const [losVal, setLosVal] = useState(defaultDays ?? "");
  const index = selectedItems.findIndex((x: any) => x.name === location);
  if (index >= 0) selectedItem = selectedItems[index].selectedValue;

  const renderLosError = () => {
    if (losVal && !selectedItem) {
      return (
        <View style={styles.errorView}>
          <ErrorMessageIcon />
          <AppText numberOfLines={2} style={styles.errorLabel}>
            {`Enter Provider for ${location}`}
          </AppText>
        </View>
      );
    }

    if (selectedItem && Number(losVal) === 0) {
      return (
        <View style={styles.errorView}>
          <ErrorMessageIcon />
          <AppText numberOfLines={2} style={styles.errorLabel}>
            {translate.t(langVar.targetLOSError)}
          </AppText>
        </View>
      );
    }
  };

  return (
    <>
      <View
        accessibilityLabel={testID}
        testID={testID}
        style={{ ...styles.locationContainer, opacity: isDisabled ? 0.4 : 1 }}
      >
        <AppText style={styles.locationValueText}>{location}</AppText>
        <DropdownComponent
          testID={`${location}dropDownTocID`}
          isDisabled={isDisabled}
          showDropDown={showDropDown}
          selectedItems={selectedItems}
          locationKey={location}
        />
        <ToCDaysInput
          testID={`${location}${type}TocID`}
          style={{
            flex: 0.15,
            borderColor:
              selectedItem && Number(losVal) === 0
                ? themes.ErrorRed
                : themes.searchBoxBorder,
          }}
          defaultDays={defaultDays?.toString()}
          isDisabled={isDisabled}
          onChangeTOCDays={(value: string) => {
            setLosVal(value);
            onChangeDays(value);
          }}
        />
      </View>

      {renderLosError()}
    </>
  );
};

export default LocationSelectionContainer;
