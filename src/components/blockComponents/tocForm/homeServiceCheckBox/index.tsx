import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import { Props } from "./type";
import AppButton from "../../../baseComponents/appButton";
import { Checkbox } from "react-native-paper";
import { langVar, themes, translate } from "../../../../enums";

const HomeServiceCheckBox = ({ isChecked, onCheck, isApproved }: Props) => {
  return (
    <AppButton
      onPress={isApproved ? () => {} : onCheck}
      style={styles.checkboxLabel}
    >
      <Checkbox.Android
        color={themes.green}
        uncheckedColor={themes.LightGreen2}
        status={isChecked ? "checked" : "unchecked"}
      />
      <AppText style={styles.homeText}>
        {translate.t(langVar.homeWithoutService)}
      </AppText>
    </AppButton>
  );
};

export default HomeServiceCheckBox;
