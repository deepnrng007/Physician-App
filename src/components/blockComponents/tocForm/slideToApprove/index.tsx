import { View } from "react-native";
import React from "react";
import AppText from "../../../baseComponents/appText";
import { styles } from "./styles";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { WhiteBackArrow, WhiteRightArrow } from "../../../../utils/imagePaths";
import { scale } from "react-native-size-matters";
import { langVar, translate } from "../../../../enums";

type Props = {
  onSwipeLeft: () => void;
  testID?: string;
  isDisable: boolean;
};

const SlideToApprove = ({ onSwipeLeft, testID, isDisable }: Props) => {
  const LeftSwipeActions = () => {
    return (
      <View
        accessibilityLabel={testID}
        testID={testID}
        style={{
          flex: 0.001,
          backgroundColor: "#ccffbd",
          justifyContent: "center",
        }}
      ></View>
    );
  };
  return isDisable ? null : (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        onSwipeableLeftOpen={onSwipeLeft}
      >
        <View style={styles.slideButtonView}>
          <AppText style={styles.slideButtonText}>
            {translate.t(langVar.slideToApprove)}
          </AppText>
          <WhiteRightArrow height={scale(19)} width={scale(19)} />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default SlideToApprove;
