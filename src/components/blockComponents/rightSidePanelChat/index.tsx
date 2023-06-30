import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ChatComponent,
  Underline,
  useAppDispatch,
  useAppSelector,
} from "../..";
import RightSideChatPanelPatientDetails from "../../baseComponents/rightSideChatPanelPatientDetails";
import styles from "./styles";
import RightSidePanel from "../rightSidePanel";
import { scale } from "react-native-size-matters";
import ContainerView from "../containerView";
import { fetchTwilioids } from "../../../redux/apis/fetchtwilioid";
import { conversationType, responseStatus } from "../../../enums/constants";
import { getMessages } from "../../../screens/messages/helper";
import NotFoundOrError from "../../baseComponents/notFoundOrError";
import { clearChatIdsAction } from "../../../redux/slicers/chatIdsSlice";

type props = {
  visible: boolean;
  onDismiss: any;
  oppositeUserId: string;
  convoType: string;
  patientDetails: {
    patientName: string;
    procedureName: string;
    procudureDate: string;
  };
};
const RightSidePanelChat = ({
  visible,
  onDismiss,
  oppositeUserId,
  patientDetails,
  convoType,
}: props) => {
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [messagesList, setMessagesList] = useState([]);
  const { chatIdsData, loginData } = useAppSelector((state) => {
    return {
      chatIdsData: state.chatIds,
      loginData: state.login,
    };
  });
  const {
    loginDetails: { userOwnerId },
  } = loginData;
  const { idsDetails, chatIdLoading, chatIderror } = chatIdsData;
  const { isConversationExist = false, conversationID, response } = idsDetails;
  const recordsPerPage = 5;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConversationExist && response === responseStatus) {
      getConversationList();
    }
  }, [isConversationExist]);

  useEffect(() => {
    return () => {
      dispatch(clearChatIdsAction());
    };
  }, []);

  const getConversationList = async () => {
    const params = {
      conversationID,
      offset,
      limit: recordsPerPage,
    };
    const res = await getMessages(params);
    if (res.length > 0) {
      setOffset(recordsPerPage * (pagination + 1));
      setPagination(pagination + 1);
      setMessagesList([...messagesList, ...res] as any);
    }
  };
  const onEndScrolledReached = () => {
    getConversationList();
  };

  useEffect(() => {
    if (visible) {
      const data = {
        participantsUserId: [userOwnerId, oppositeUserId],
        type: convoType as any,
        ownerUserId: userOwnerId,
        tag: null,
      };
      dispatch(fetchTwilioids(data));
    }
  }, [visible]);
  return (
    <RightSidePanel visible={visible} onDismiss={onDismiss}>
      <ContainerView
        style={{ padding: 0, paddingTop: 10 }}
        loading={chatIdLoading}
        enableSafeArea={false}
      >
        <View style={styles.container}>
          <RightSideChatPanelPatientDetails
            onDismiss={onDismiss}
            title={idsDetails?.response === responseStatus && idsDetails?.name}
            patientDetails={patientDetails}
          />
        </View>
        <Underline style={{ marginTop: scale(20) }} />
        {!chatIderror ? (
          <ChatComponent
            messages={messagesList.length > 0 ? messagesList : [{}]}
            onEndScrolledReached={onEndScrolledReached}
            currentUser={{ _id: userOwnerId }}
          />
        ) : (
          <NotFoundOrError enableIcon={true} type="error" />
        )}
      </ContainerView>
    </RightSidePanel>
  );
};

export default RightSidePanelChat;

RightSidePanelChat.defaultProps = {
  onDismiss: () => {},
  convoType: conversationType.GENERAL,
};
