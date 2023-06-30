import { ViewStyle } from "react-native";
import React from "react";
import {
  ContactEmpty,
  ContactSearchEmpty,
  EmptyNotificationIcon,
  ErrorImage,
  MessageInboxEmpty,
  NoEpisodeImage,
  NoToCImage,
  OopsImage,
} from "../../../utils/imagePaths";
import NoResultFound from "../noResultFound";
import { langVar, translate } from "../../../enums";
import AvoidKeyboardComponent from "../avoidKeyboardComponent";
import { scale } from "react-native-size-matters";

type props = {
  style?: ViewStyle;
  type:
    | "oops"
    | "error"
    | "emptyInbox"
    | "noEpisodesFound"
    | "noToCsFound"
    | "noContactsFound"
    | "noContactsAvailable"
    | "noNotifications"
    | "tocOopsNotFound"
    | "episodeOopsNotFound";
  enableIcon: boolean;
  verticalOffset: number;
};
const NotFoundOrError = ({
  style,
  type,
  enableIcon,
  verticalOffset,
}: props) => {
  const imageType = () => {
    if (type === "oops")
      return (
        <NoResultFound
          Icon={OopsImage}
          line1={translate.t(langVar.nothingFound)}
          line2={translate.t(langVar.pleaseCheckkeyboard)}
        />
      );
    else if (type === "tocOopsNotFound")
      return (
        <NoResultFound
          Icon={NoToCImage}
          line1={translate.t(langVar.oops)}
          line2={translate.t(langVar.pleaseCheckkeyboard)}
        />
      );
    else if (type === "episodeOopsNotFound")
      return (
        <NoResultFound
          Icon={NoEpisodeImage}
          line1={translate.t(langVar.oops)}
          line2={translate.t(langVar.pleaseCheckkeyboard)}
        />
      );
    else if (type === "error")
      return (
        <NoResultFound
          Icon={ErrorImage}
          line1={translate.t(langVar.somethingWrong)}
          line2={translate.t(langVar.weareworking)}
        />
      );
    else if (type === "emptyInbox")
      return (
        <NoResultFound
          Icon={MessageInboxEmpty}
          line1={translate.t(langVar.noMessageFound)}
          line2={translate.t(langVar.emptyInboxsubText)}
        />
      );
    else if (type === "noEpisodesFound")
      return (
        <NoResultFound
          Icon={NoEpisodeImage}
          line1={translate.t(langVar.noEpisodeFound)}
          line2={translate.t(langVar.noEpisodeFoundsubText)}
        />
      );
    else if (type === "noToCsFound")
      return (
        <NoResultFound
          Icon={NoToCImage}
          line1={translate.t(langVar.noTocsFound)}
        />
      );
    else if (type === "noContactsFound")
      return (
        <NoResultFound
          Icon={ContactSearchEmpty}
          line1={translate.t(langVar.noContactsFound)}
          line2={translate.t(langVar.pleaseRefineSearch)}
        />
      );
    else if (type === "noContactsAvailable")
      return (
        <NoResultFound
          Icon={ContactEmpty}
          line1={translate.t(langVar.noContactAvailable)}
          line2={translate.t(langVar.contactNotAvailableDesc)}
        />
      );
    else if (type === "noNotifications")
      return (
        <NoResultFound
          Icon={EmptyNotificationIcon}
          line1={translate.t(langVar.noNotificationMessage)}
          line2={translate.t(langVar.noNotificationMessageSubText)}
        />
      );
  };

  return (
    <AvoidKeyboardComponent
      verticalOffset={verticalOffset}
      style={
        [
          enableIcon
            ? {
                flex: 1,
              }
            : { flex: 0 },
          style,
        ] as ViewStyle
      }
    >
      {enableIcon ? imageType() : null}
    </AvoidKeyboardComponent>
  );
};

export default NotFoundOrError;

NotFoundOrError.defaultProps = {
  isError: false,
  verticalOffset: scale(100),
};
