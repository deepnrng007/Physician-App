import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import Card from "../../../baseComponents/card";
import { langVar, translate } from "../../../../enums";

const CautionCard = () => {
  return (
    <Card style={styles.cautionCard}>
      <View>
        <AppText style={styles.highlightedText}>
          Caution:{" "}
          <AppText
            style={styles.text}
            highlightStyle={styles.highlightedText}
            searchKeywords={[translate.t(langVar.highlightedCaution)]}
          >
            {translate.t(langVar.caution)}
            {/* The following suggested Transition of Care pathway is drafted for
            your convenience only. You as a physician are solely responsible for
            the Transition of Care Plan.You must modify the suggested plan
            according to your medical judgement */}
          </AppText>
        </AppText>
      </View>
    </Card>
  );
};

export default CautionCard;
