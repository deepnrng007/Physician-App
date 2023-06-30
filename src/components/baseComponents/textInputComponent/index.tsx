import { View, Text, TextStyle, ViewStyle, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import AppButton from "../appButton";
import {
  PasswordInSecureIcon,
  PasswordSecureIcon,
} from "../../../utils/imagePaths";
import { themes } from "../../../enums";

type TextInputComponentProps = {
  style?: any;
  label?: string;
  placeholder: string;
  textInputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  onTextChange: any;
  inputValue?: string;
  secureTextEntry: boolean;
  isError: boolean;
  keyboardType: "phone-pad" | "numeric" | "number-pad";
  Icon?: any;
  testID?: string;
};

const TextInputComponent = ({
  style,
  label,
  placeholder,
  textInputStyle,
  labelStyle,
  onTextChange,
  secureTextEntry,
  isError,
  keyboardType,
  Icon,
  testID,
  inputValue,
}: TextInputComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={style}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.textField}>
        {Icon && (
          <View style={styles.keyIcon}>
            <Icon />
          </View>
        )}
        <TextInput
          testID={testID}
          accessibilityLabel={testID}
          autoCorrect={false}
          value={inputValue}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholder={placeholder}
          style={[
            styles.inputStyle,
            textInputStyle,
            isError && { color: themes.Red4 },
          ]}
          onChangeText={onTextChange}
        />
        {secureTextEntry && (
          <AppButton
            style={styles.showPassword as ViewStyle}
            onPress={onShowPassword}
          >
            {showPassword ? <PasswordInSecureIcon /> : <PasswordSecureIcon />}
          </AppButton>
        )}
      </View>
    </View>
  );
};

export default TextInputComponent;

TextInputComponent.defaultProps = {
  placeholder: "",
  secureTextEntry: false,
  isError: false,
  keyboardType: "default",
};
