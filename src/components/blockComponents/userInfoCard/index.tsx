import React from "react";
import { View } from "react-native";
import { AppButton, Loader } from "../..";
import { langVar, themes, translate } from "../../../enums";
import AppText from "../../baseComponents/appText";
import Card from "../../baseComponents/card";
import { styles } from "./styles";
import { UserInfoProps } from "./types";

const UserInfoCard = ({ userName, onClickSignout, loading }: UserInfoProps) => {
  return (
    <Card style={styles.userInfoView}>
      <View style={styles.userDirection}>
        <View>
          <AppText style={styles.loggedInText}>Logged in as</AppText>
          <AppText style={styles.userName} numberOfLines={1}>
            {userName}
          </AppText>
        </View>
        <View style={styles.signOutView}>
          {loading ? (
            <View style={styles.loader}>
              <Loader isLabelRequired={false} loaderColor={themes.White} />
            </View>
          ) : (
            <AppButton
              style={styles.loader}
              textStyle={styles.signoutText}
              text={translate.t(langVar.signout)}
              onPress={onClickSignout}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default UserInfoCard;
