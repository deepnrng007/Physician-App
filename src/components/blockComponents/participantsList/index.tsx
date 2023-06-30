import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { AppText, CustomModal, GroupImages } from "../..";
import { langVar, themes, translate } from "../../../enums";
import { getDeviceDimenstion } from "../../../utils/utils";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: any;
  data: {
    fullName: string;
    description: string;
    type: string;
  }[];
};
const ParticipantsList = ({ visible, onClose, data = [] }: Props) => {
  const renderItems = ({ item }: any) => {
    const {
      fullName = "",
      description = "",
      type = "",
      isLoggedInUser = false,
    } = item;
    return (
      <TouchableOpacity style={styles.item} activeOpacity={1}>
        <View style={styles.col1}>
          <GroupImages groupConversationIcon={""} name={fullName} />
        </View>
        <View style={styles.col2}>
          <AppText style={styles.name}>
            {fullName} {isLoggedInUser && translate.t(langVar.you)}
          </AppText>
          <View
            style={[
              styles.badge,
              type === "Patient" && {
                backgroundColor: themes.transparent,
              },
            ]}
          >
            <AppText
              style={[
                styles.typeLabel,
                type === "Patient" && {
                  fontSize: themes.LargeFontSize,
                  fontWeight: "500",
                },
              ]}
            >
              {description}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <CustomModal
      customBoxStyle={{ paddingBottom: 0 }}
      visible={visible}
      position={"bottom"}
      onClose={onClose}
    >
      <AppText style={styles.title}>
        {translate.t(langVar.ParticipantsInfo)}
      </AppText>
      <AppText style={styles.countMembers}>
        {data && data.length} {translate.t(langVar.participants)}
      </AppText>
      <View style={{ maxHeight: getDeviceDimenstion("height", 50) }}>
        <FlatList
          bounces={false}
          data={data}
          contentContainerStyle={{ maxHeight: 2000 }}
          renderItem={renderItems}
        />
      </View>
    </CustomModal>
  );
};

export default ParticipantsList;
