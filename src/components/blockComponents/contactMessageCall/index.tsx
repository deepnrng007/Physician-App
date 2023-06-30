import { View, ViewStyle } from "react-native";
import React from "react";
import AppTitle from "../../baseComponents/title";
import { langVar, themes, translate } from "../../../enums";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { MessageIcon } from "../../../utils/imagePaths";

type ContactMessageCallProps = {
  title: string;
  onPressCall: any;
  onPressMessage: any;
  callTestID: any;
  messageTestID: any;
  callerNumber?: any;
  messageID?: any;
};

const ContactMessageCall = ({
  title,
  onPressCall,
  onPressMessage,
  callTestID,
  messageTestID,
  callerNumber,
  messageID,
}: ContactMessageCallProps) => {
  return (
    <View>
      <AppTitle style={styles.title as ViewStyle} titleName={title} />
      <View style={styles.buttonContainer}>
        <AppButton
          testID={callTestID}
          style={
            [styles.button, !callerNumber && { opacity: 0.5 }] as ViewStyle
          }
          onPress={() => (callerNumber ? onPressCall(callerNumber) : {})}
        >
          <AntDesign
            style={[
              styles.icon,
              { transform: [{ rotate: "100deg" }], color: themes.Black },
            ]}
            name={"phone"}
          />
          <AppText style={[styles.label, styles.callLabel]}>
            {translate.t(langVar.call)}
          </AppText>
        </AppButton>
        <View style={{ flex: 6 }} />
        <AppButton
          testID={messageTestID}
          style={
            [
              styles.button,
              styles.callButton,
              !messageID && { opacity: 0.5 },
            ] as ViewStyle
          }
          onPress={() => (messageID ? onPressMessage(messageID) : {})}
        >
          <MessageIcon />
          <AppText style={styles.label}>{translate.t(langVar.message)}</AppText>
        </AppButton>
      </View>
    </View>
  );
};

export default ContactMessageCall;
