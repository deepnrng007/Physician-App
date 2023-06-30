import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ChatComponent,
  ContainerView,
  DropdownSearchContacts,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import { langVar, screenNames, translate } from "../../../enums";
import { conversationType, responseStatus } from "../../../enums/constants";
import { fetchContacts } from "../../../redux/apis/fetchContacts";
import { fetchTwilioids } from "../../../redux/apis/fetchtwilioid";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import styles from "./styles";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.CREATECONVERSION
>;

const CreateConversion = ({ navigation }: Props) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [messageData, setMessageData] = useState<any>({});
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const dispatch = useAppDispatch();

  const {
    loginDetails: { userOwnerId, firstName, lastName },
  } = useAppSelector((state) => state.login);
  const [selectedUsersData, setselectedUsersData] = useState([
    {
      description: "Physician",
      fullName: `${firstName} ${lastName}`,
      isLoggedInUser: true,
      type: "Physician",
      userID: userOwnerId,
    },
  ]);

  const {
    contactList,
    contactLoading = false,
    contactError = null,
  } = useAppSelector((state) => state.contactList);
  const { chatIdLoading, idsDetails } = useAppSelector(
    (state) => state.chatIds
  );

  const getlist = () => {
    const data: any[] = [];
    const { allContact: list } = contactList;
    list &&
      list.map((item: any) => {
        const { firstName, lastName } = item;
        const name = `${firstName} ${lastName}`;
        data.push({ label: name, data: item });
      });
    return data;
  };

  useEffect(() => {
    dispatch(fetchContacts(userOwnerId));
  }, []);

  useEffect(() => {
    if (idsDetails?.response === responseStatus && shouldNavigate) {
      setShouldNavigate(false);
      navigation.replace(screenNames.CHAT, {
        message: messageData,
        conversionName: selectedList.join(),
        conversationID: idsDetails.conversationID,
        participantDetails: selectedUsersData,
      });
    }
  }, [idsDetails]);

  const onSelectedItem = (item: any) => {
    const {
      label,
      data: { userId, description, contactType, firstName, lastName },
    } = item;

    const data = {
      description,
      fullName: `${firstName} ${lastName}`,
      isLoggedInUser: false,
      type: contactType,
      userID: userId,
    };
    setselectedUsersData((prev) => [...prev, data] as any);
    setSelectedUserIds([userId, ...selectedUserIds]);
    setSelectedList([label, ...selectedList]);
  };

  const onArrowClicked = (flag: any) => {
    if (flag !== undefined) setArrowClicked(flag);
    else setArrowClicked(!arrowClicked);
  };

  const onItemRemoved = (label: string) => {
    const index = selectedList.indexOf(label);
    const items = [...selectedList];
    const idItems = [...selectedUserIds];
    idItems.splice(index, 1);
    setSelectedUserIds(idItems);
    items.splice(index, 1);
    setSelectedList(items);
    if (items.length === 0) {
      setArrowClicked(false);
    }
  };

  const onMessageSend = (message: any) => {
    if (selectedUserIds.length > 0) {
      setMessageData(message);
      const data = {
        participantsUserId: [userOwnerId, ...selectedUserIds],
        type: conversationType.GENERAL,
        ownerUserId: userOwnerId,
        tag: null,
      };
      setShouldNavigate(true);
      dispatch(fetchTwilioids(data));
    }
  };

  return (
    <ContainerView
      isBackRequired
      style={{ padding: 0 }}
      loading={contactLoading || chatIdLoading}
      headerName={translate.t(langVar.NewMessage)}
    >
      {contactError ? (
        <NotFoundOrError type={"error"} enableIcon={true} />
      ) : (
        <>
          <View
            style={[
              styles.dropdownContainer,
              isAttachmentVisible ? { zIndex: -1 } : { zIndex: 1 },
            ]}
          >
            <DropdownSearchContacts
              placeholder={translate.t(langVar.addReciepient)}
              list={getlist()}
              onSelectItem={onSelectedItem}
              selectedList={selectedList}
              arrowClicked={arrowClicked}
              onPressArrow={onArrowClicked}
              onItemRemoved={onItemRemoved}
            />
          </View>
          <ChatComponent
            onOpenAttachment={setIsAttachmentVisible}
            onMessage={onMessageSend}
            isLoadingRequired={false}
            messages={[{}]}
            disableSendOption={selectedList.length === 0}
            currentUser={{
              _id: userOwnerId,
              name: firstName,
            }}
          />
        </>
      )}
    </ContainerView>
  );
};

export default CreateConversion;
