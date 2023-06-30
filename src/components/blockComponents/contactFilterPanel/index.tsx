import { View, ViewStyle } from "react-native";
import React, { useState } from "react";
import RightSidePanel from "../rightSidePanel";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { langVar, themes, translate } from "../../../enums";
import styles from "./styles";
import { CloseIcon } from "../../../utils/imagePaths";
import ContactFilter from "../contactFilter";
import { ContactFilterPanelProps } from "./types";

const ContactFilterPanel = ({
  visible,
  onDismiss,
  onPressApplyFilter,
  onPressClearFilter,
  contactTypes,
}: ContactFilterPanelProps) => {
  const [filteredContactsType, setFilteredContact] = useState<any>(null);

  return (
    <View>
      {visible && (
        <RightSidePanel visible={true} onDismiss={onDismiss}>
          <SafeAreaView style={styles.container}>
            <View>
              <View style={styles.filterTitleView}>
                <AppText style={styles.filterTitle}>
                  {translate.t(langVar.filter)}
                </AppText>
                <AppButton onPress={onDismiss}>
                  <CloseIcon />
                </AppButton>
              </View>
              <ContactFilter
                selected={filteredContactsType}
                onTypeSelected={(contactType: string) =>
                  setFilteredContact(contactType)
                }
                style={styles.locationContainer}
                title={translate.t(langVar.locations)}
                list={contactTypes}
              />
            </View>
            <View>
              <AppButton
                style={styles.button}
                onPress={() => {
                  onPressApplyFilter(filteredContactsType);
                }}
              >
                <AppText style={styles.buttonLabel}>
                  {translate.t(langVar.applyFilters)}
                </AppText>
              </AppButton>
              <AppButton
                style={[styles.button, styles.clearButton] as ViewStyle}
                onPress={() => {
                  setFilteredContact(false);
                  onPressClearFilter();
                }}
              >
                <AppText style={[styles.buttonLabel, { color: themes.Black }]}>
                  {translate.t(langVar.clearFilters)}
                </AppText>
              </AppButton>
            </View>
          </SafeAreaView>
        </RightSidePanel>
      )}
    </View>
  );
};

export default ContactFilterPanel;

ContactFilterPanel.defaultProps = {
  visible: false,
  onDismiss: () => {},
};
