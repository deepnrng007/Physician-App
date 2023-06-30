import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import Card from "../../../baseComponents/card";
import { RightArrow } from "../../../../utils/imagePaths";
import { getDateFormatForDay, getLocaleTime } from "../../../../utils/utils";

type props = {
  testID?: string;
  date: any;
  noteDescription: string;
  onNotePress: any;
};

const NavigatorNoteCard = ({
  testID,
  date,
  noteDescription,
  onNotePress,
}: props) => {
  return (
    <Card style={styles.navigatorNotesCard} onpress={onNotePress}>
      <View accessibilityLabel={testID} testID={testID}>
        <View style={styles.notesContentView}>
          <AppText style={styles.notesTitle}>Notes from Navigator</AppText>
          <AppText style={styles.notesDate}>
            {date
              ? getDateFormatForDay(date, "MM/DD/YYYY") +
                " at " +
                getLocaleTime(date, "hh:mm a")
              : ""}
          </AppText>
        </View>
        <View style={styles.notesContentView}>
          <AppText numberOfLines={2} style={styles.notesDescription}>
            {noteDescription}
          </AppText>
          <RightArrow />
        </View>
      </View>
    </Card>
  );
};

export default NavigatorNoteCard;
