import { View } from "react-native";
import React from "react";
import { AppButton, AppText } from "../..";
import { styles } from "./styles";
import { contactListProps } from "./types";

const enum contactTypeEnum {
  Navigator = "Navigator",
}

const ContactListItem = (props: contactListProps) => {
  const {
    itemContainer,
    leftElementContainer,
    rightSectionContainer,
    mainTitleContainer,
    titleStyle,
    descriptionStyle,
    navigatorTitleView,
    descriptionMargin,
  } = styles;

  const { leftElement, title, contactType, onPressContact } = props;

  return (
    <AppButton onPress={onPressContact}>
      <View style={itemContainer}>
        {leftElement ? (
          <View style={leftElementContainer}>{leftElement}</View>
        ) : (
          <View />
        )}
        <View style={rightSectionContainer}>
          <View style={mainTitleContainer}>
            <AppText style={titleStyle}>{title}</AppText>
            {contactType ? (
              contactType === contactTypeEnum.Navigator ? (
                <View style={navigatorTitleView}>
                  <AppText style={descriptionStyle}>{contactType}</AppText>
                </View>
              ) : (
                <AppText style={{ ...descriptionStyle, ...descriptionMargin }}>
                  {contactType}
                </AppText>
              )
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </AppButton>
  );
};

export default ContactListItem;
