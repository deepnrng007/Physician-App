import { TextInput, View } from "react-native";
import React, { useState } from "react";
import logger from "../../../../utils/logger";
import { styles } from "./styles";
import { getDigitsFromText } from "../../../../utils/utils";

type Props = {
  style?: any;
  defaultDays?: string;
  isDisabled: boolean;
  testID?: string;
  onChangeTOCDays?: any;
};

const ToCDaysInput = ({
  style,
  defaultDays,
  isDisabled,
  testID,
  onChangeTOCDays,
}: Props) => {
  const [val, setVal] = useState(defaultDays ?? "");
  return (
    <View style={{ ...styles.input, ...style }}>
      <TextInput
        testID={testID}
        accessibilityLabel={testID}
        autoCorrect={false}
        style={{ ...styles.texInput }}
        keyboardType={"number-pad"}
        returnKeyType={"done"}
        onChangeText={(value) => {
          setVal(getDigitsFromText(value));
          onChangeTOCDays(value);
        }}
        underlineColorAndroid="transparent"
        numberOfLines={1}
        maxLength={2}
        value={val}
        editable={!isDisabled}
      />
    </View>
  );
};

export default ToCDaysInput;
