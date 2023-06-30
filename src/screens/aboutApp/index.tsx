import React from "react";
import { getVersion } from "react-native-device-info";
import {
  AppText,
  ContainerView,
  Underline,
  useAppSelector,
} from "../../components";
import DrawerElement from "../../components/blockComponents/drawerElement";
import { langVar, screenNames, translate } from "../../enums";
import { TermsAndConditionIcon } from "../../utils/imagePaths";
import styles from "./styles";

const AboutApp = ({ navigation }: any) => {
  const { loginDetails } = useAppSelector((state) => state.login);
  const { termsAndConditions } = loginDetails;
  return (
    <ContainerView
      enableSafeArea
      isBackRequired
      headerName={translate.t(langVar.about)}
    >
      <AppText style={styles.title}>
        {translate.t(langVar.enavProvider)}
      </AppText>
      <AppText style={styles.version}>v {getVersion()}</AppText>
      <AppText style={styles.desc}>{translate.t(langVar.aboutAppDesc)}</AppText>
      <Underline style={styles.underline} />
      <DrawerElement
        showDivider={false}
        DrawerIcon={TermsAndConditionIcon}
        label={translate.t(langVar.termsAndConditions).toLocaleUpperCase()}
        onNavigate={() => {
          navigation.navigate(screenNames.PDFVIEWERSCREEN, {
            showButtons: false,
            url: termsAndConditions,
            isBackRequired: true,
          });
        }}
      />
      <Underline style={styles.underline} />
    </ContainerView>
  );
};

export default AboutApp;
