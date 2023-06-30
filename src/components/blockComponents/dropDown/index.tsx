import React from "react";
import { View } from "react-native";
import { langVar, translate } from "../../../enums";
import { DropDownIcon } from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import { styles } from "./styles";

type Props = {
  isDisabled: boolean;
  showDropDown: any;
  selectedItems: any;
  locationKey: string;
  testID?: string;
};

const DropdownComponent = ({
  isDisabled,
  showDropDown,
  selectedItems,
  locationKey,
  testID,
}: Props) => {
  const selectedItem = selectedItems.find(
    (item: any) => item.name === locationKey
  );

  const { selectedValue = {} } = selectedItem ? selectedItem : {};
  const { ProviderName = "" } = selectedValue ? selectedValue : {};

  return (
    <AppButton
      testID={testID}
      isDisabled={isDisabled}
      onPress={showDropDown}
      disabledStyle={styles.dropdown}
      style={styles.dropdown}
    >
      {ProviderName && ProviderName.length > 0 ? (
        <AppText numberOfLines={1} style={styles.selectedText}>
          {ProviderName}
        </AppText>
      ) : (
        <AppText numberOfLines={1} style={styles.placeHolder}>
          {translate.t(langVar.selectFacility)}
        </AppText>
      )}
      <AppButton
        isDisabled={isDisabled}
        onPress={showDropDown}
        style={styles.icon}
        disabledStyle={styles.icon}
      >
        <DropDownIcon />
      </AppButton>
    </AppButton>
  );
};

export default DropdownComponent;
