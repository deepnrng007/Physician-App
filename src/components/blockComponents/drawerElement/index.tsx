/* This component is useful for
DrawerItem */

import React from "react";

import { RightArrow } from "../../../utils/imagePaths";
import { styles } from "./styles";
import { View } from "react-native";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import { DrawerElementProps } from "./types";
const DrawerElement = ({
  label,
  onNavigate,
  DrawerIcon,
  showDivider,
}: DrawerElementProps) => {
  return (
    <View>
      <AppButton onPress={() => onNavigate()}>
        <View style={styles.navigationMenuView}>
          <View style={styles.navigationMenuInnerView}>
            <DrawerIcon />
            <AppText style={styles.drawerLabel}>{label}</AppText>
          </View>
          <RightArrow style={styles.rightArrow} />
        </View>
      </AppButton>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

export default DrawerElement;

DrawerElement.defaultProps = {
  showDivider: true,
};
