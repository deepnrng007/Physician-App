import { View, TextInput, ViewStyle, Animated, Text } from "react-native";
import React, { memo, useEffect, useRef } from "react";
import styles from "./styles";
import { langVar, themes, translate } from "../../../enums";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scale } from "react-native-size-matters";
import { CloseBlackIcon } from "../../../utils/imagePaths";
import AppButton from "../appButton";

type SearchBoxProps = {
  placeholder: string;
  onTextChange: any;
  style: ViewStyle;
  onFocusHideSearchIcon: boolean;
  searchEnabled: boolean;
  testID?: string;
  getReference?: any;
  initialValue?: string;
};

function SearchBox({
  placeholder,
  onTextChange,
  onFocusHideSearchIcon,
  style,
  searchEnabled,
  testID,
  getReference,
  initialValue,
  ...props
}: SearchBoxProps) {
  const animateHideSearchIcon = new Animated.Value(scale(25));
  const textInputRef = useRef<any>(null);

  useEffect(() => {
    if (initialValue && textInputRef.current)
      textInputRef.current.setNativeProps({
        text: initialValue,
      });
  }, []);

  useEffect(() => {
    if (textInputRef) getReference(textInputRef.current);
  }, [textInputRef]);

  const onTextInputFocused = () => {
    Animated.timing(animateHideSearchIcon, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onClearText = () => {
    onTextChangeInput("");
    textInputRef.current.clear();
  };

  const onTextInputBlur = () => {
    Animated.timing(animateHideSearchIcon, {
      toValue: scale(28),
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onTextChangeInput = (text: string) => {
    onTextChange(text);
  };
  return (
    <View style={[styles.searchView, style]}>
      <Animated.View
        style={
          onFocusHideSearchIcon &&
          parseInt(JSON.stringify(animateHideSearchIcon)) != 0
            ? {
                width: animateHideSearchIcon,
              }
            : { marginRight: scale(10) }
        }
      >
        <AntDesign style={styles.icon} name={"search1"} />
      </Animated.View>
      <TextInput
        accessibilityLabel={testID}
        testID={testID}
        {...props}
        autoCorrect={false}
        ref={(ref) => (textInputRef.current = ref)}
        style={styles.searchBox}
        placeholderTextColor={themes.Black1}
        placeholder={placeholder}
        onChangeText={onTextChangeInput}
        onFocus={onTextInputFocused}
        onBlur={onTextInputBlur}
        underlineColorAndroid="transparent"
      />
      {searchEnabled && (
        <AppButton onPress={onClearText}>
          <CloseBlackIcon />
        </AppButton>
      )}
    </View>
  );
}

SearchBox.defaultProps = {
  placeholder: translate.t(langVar.searchPatientName),
  onFocusHideSearchIcon: false,
  onTextChange: () => {},
  style: {},
  searchEnabled: false,
  getReference: () => {},
};
export default memo(SearchBox);
