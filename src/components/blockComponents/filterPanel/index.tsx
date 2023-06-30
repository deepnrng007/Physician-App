import React from "react";
import { View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RightSidePanel from "../rightSidePanel";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { langVar, themes, translate } from "../../../enums";
import styles from "./styles";
import { CloseIcon } from "../../../utils/imagePaths";

type FilterPanelProps = {
  onDismiss: () => void;
  onFilterApply?: () => void;
  onFilterClear?: () => void;
  children: any;
};

const FilterPanel = ({
  onDismiss,
  onFilterClear,
  onFilterApply,
  children,
}: FilterPanelProps) => {
  return (
    <View>
      <RightSidePanel visible={true} onDismiss={onDismiss}>
        <SafeAreaView style={styles.container}>
          <View>
            <>
              <View style={styles.filterTitleView}>
                <AppText style={styles.filterTitle}>
                  {translate.t(langVar.filter)}
                </AppText>
                <AppButton onPress={onDismiss}>
                  <CloseIcon />
                </AppButton>
              </View>
            </>
          </View>
          <ScrollView>{children}</ScrollView>
          <View>
            <AppButton onPress={onFilterApply} style={styles.button}>
              <AppText style={styles.buttonLabel}>
                {translate.t(langVar.applyFilters)}
              </AppText>
            </AppButton>
            <AppButton
              onPress={onFilterClear}
              style={[styles.button, styles.clearButton] as ViewStyle}
            >
              <AppText style={[styles.buttonLabel, { color: themes.Black }]}>
                {translate.t(langVar.clearFilters)}
              </AppText>
            </AppButton>
          </View>
        </SafeAreaView>
      </RightSidePanel>
    </View>
  );
};

export default FilterPanel;

FilterPanel.defaultProps = {
  visible: false,
  onDismiss: () => {},
};
