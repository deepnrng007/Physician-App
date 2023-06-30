import React from "react";
import { styles } from "./styles";
import AppButton from "../../../baseComponents/appButton";
import { langVar, translate } from "../../../../enums";

type Props = {
  onPressChange: () => void;
  isShowLocation: boolean;
  isDisabled?: boolean;
};
const AddChangeLocationButton = ({
  onPressChange,
  isShowLocation,
  isDisabled = false,
}: Props) => {
  return (
    <AppButton
      text={
        isShowLocation
          ? translate.t(langVar.hideLocation)
          : translate.t(langVar.addChangeLocation)
      }
      style={styles.changeLocation}
      textStyle={{
        ...styles.changeLocationText,
        opacity: isDisabled ? 0.4 : 1,
      }}
      onPress={onPressChange}
    />
  );
};

export default AddChangeLocationButton;
