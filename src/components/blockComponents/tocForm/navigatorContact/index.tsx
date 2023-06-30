import { View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Props } from "./type";
import { langVar, translate } from "../../../../enums";
import ContactMessageCall from "../../contactMessageCall";

const NavigatorContact = ({
  onPressCall,
  onPressMessage,
  callTestID,
  messageTestID,
  callerNumber,
  messageID,
}: Props) => {
  return (
    <View style={styles.buttonView}>
      <ContactMessageCall
        callerNumber={callerNumber}
        messageID={messageID}
        callTestID={callTestID}
        messageTestID={messageTestID}
        title={translate.t(langVar.contactNavigator)}
        onPressCall={onPressCall}
        onPressMessage={onPressMessage}
      />
    </View>
  );
};

export default NavigatorContact;
