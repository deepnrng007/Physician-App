import { View } from "react-native";
import React from "react";
import { AppText } from "../../..";
import { styles } from "./styles";

type Props = {
  headerText: string;
};

const ContactListHeader = ({ headerText }: Props) => {
  return (
    <View>
      <AppText style={styles.contactHeaderText}>{headerText}</AppText>
    </View>
  );
};

export default ContactListHeader;
