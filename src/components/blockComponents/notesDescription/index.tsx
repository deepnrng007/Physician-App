import { Modal, ViewStyle, View, ScrollView } from "react-native";
import React from "react";
import { styles } from "./styles";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import { getDateFormatForDay, getLocaleTime } from "../../../utils/utils";

type Props = {
  notes: string;
  isShow: boolean;
  hideNotes: any;
  date: any;
};
const NotesDescription = ({ notes, isShow, hideNotes, date }: Props) => {
  return (
    <Modal visible={isShow} transparent={true}>
      <View style={styles.container as ViewStyle}>
        <View style={styles.dialogView}>
          <AppText style={styles.alertMessage}>Notes from Navigator</AppText>
          <View style={styles.dateView}>
            {date && (
              <AppText style={styles.date}>
                {getDateFormatForDay(date, "MM/DD/YYYY") +
                  " at " +
                  getLocaleTime(date, "hh:mm a")}
              </AppText>
            )}
          </View>
          <ScrollView
            style={styles.contentStyle}
            showsVerticalScrollIndicator={false}
          >
            <AppText style={styles.notesText}>{notes}</AppText>
          </ScrollView>

          <AppButton
            style={styles.approveButton}
            textStyle={styles.approveText}
            text="Hide"
            onPress={hideNotes}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NotesDescription;
