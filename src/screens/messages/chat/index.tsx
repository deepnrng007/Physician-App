import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import {
  ChatComponent,
  ContainerView,
  ParticipantsList,
  Loader,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import NavigationHeader from "../../../components/blockComponents/navigationHeader";
import { screenNames } from "../../../enums";
import { global } from "../../../global";
import { addChatIdsAction } from "../../../redux/slicers/chatIdsSlice";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { ParticipantsIcon } from "../../../utils/imagePaths";
import { getFirstNameFromConvoNames } from "../../../utils/utils";
import { getMessages } from "../helper";
import styles from "./styles";

type ChatProps = NativeStackScreenProps<RootStackParams, screenNames.CHAT>;

const Chat = ({ route }: ChatProps) => {
  const {
    conversionName = "",
    conversationID,
    twilioConversationId,
    message,
    messageIndex = 0,
    cameFrom = null,
    participantDetails = [],
  } = route?.params;

  const [messagesList, setMessagesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [addMessage, setAddMessage] = useState(message);
  const [showParticipants, setShowParticipants] = useState(false);
  const [loading, setLoading] = useState(true);
  const recordsPerPage = 20;

  const dispatch = useAppDispatch();
  const { chatIdsData, loginData } = useAppSelector((state) => {
    return {
      chatIdsData: state.chatIds,
      loginData: state.login,
    };
  });
  const {
    idsDetails: { isConversationExist = false },
  } = chatIdsData;
  const [isConvoExist, setIsConvoExist] = useState(isConversationExist);
  const {
    loginDetails: { userOwnerId, firstName, ownereMail },
  } = loginData;

  const currentUSer = {
    _id: userOwnerId,
    name: firstName,
    ownereMail,
  };

  useEffect(() => {
    global.NOTIFICATIONNAVIGATEPENDING = null;
    if (twilioConversationId) {
      dispatch(
        addChatIdsAction({
          conversationTwilioID: twilioConversationId,
          conversationID,
        })
      );
    }
    if (isConversationExist || twilioConversationId) {
      const index: number =
        messageIndex > recordsPerPage ? messageIndex + 2 : recordsPerPage;
      getConversationList(index);
    } else setLoading(false);
  }, []);

  const getConversationList = async (nofOfRecords?: number) => {
    const limit = nofOfRecords ? nofOfRecords : offset;
    const params = {
      conversationID,
      offset: 0,
      limit,
    };
    const res = await getMessages(params);
    if (res.length > 0) {
      setOffset(limit * (pagination + 1));
      setPagination(pagination + 1);
      setMessagesList(res as any);
    }
    setLoading(false);
  };

  const onEndScrolledReached = (data: any) => {
    if (messagesList.length >= recordsPerPage) {
      setAddMessage(null);
      setIsConvoExist(false);
      getConversationList();
    }
  };
  return (
    <ContainerView style={{ padding: 0 }} hideStatusSpacer>
      <NavigationHeader
        customGoBack={cameFrom}
        style={styles.navigation as ViewStyle}
        navigationTitle={getFirstNameFromConvoNames(conversionName)}
        RightIcon={ParticipantsIcon}
        isFilterRequired
        onPressFilterIcon={() => setShowParticipants((prev) => !prev)}
      />
      <ParticipantsList
        data={participantDetails}
        visible={showParticipants}
        onClose={() => setShowParticipants((prev) => !prev)}
      />
      {!loading ? (
        <ChatComponent
          messages={messagesList.length > 0 ? messagesList : [{}]}
          scrollToIndex={messageIndex}
          onEndScrolledReached={onEndScrolledReached}
          isConversationExist={isConvoExist}
          isNameShownforSingleConversation={
            conversionName.split(",").length > 1
          }
          addMessage={
            addMessage
              ? {
                  fileSize: addMessage.size,
                  content: addMessage.content
                    ? addMessage.content
                    : addMessage.fileCopyUri,
                  type: addMessage.type,
                  fileName: addMessage.name,
                }
              : null
          }
          currentUser={currentUSer}
        />
      ) : (
        <Loader />
      )}
    </ContainerView>
  );
};

export default Chat;
