import { View, ViewStyle } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screenNames } from "../../enums/screenNames";
import {
  ContainerView,
  Loader,
  SearchBox,
  useAppDispatch,
  useAppSelector,
} from "../../components";
import styles from "./styles";
import NavigationHeader from "../../components/blockComponents/navigationHeader";
import ContactList from "../../components/blockComponents/contactList";
import BottomSheet from "../../components/blockComponents/bottomSheet";
import { contactType } from "./types";
import AlphabetsContainer from "../../components/blockComponents/alphabetsContainer";
import ContactFilterPanel from "../../components/blockComponents/contactFilterPanel";
import { batch } from "react-redux";
import { getAlphabetsArray } from "../../utils/utils";
import { langVar, translate } from "../../enums";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import { fetchContacts } from "../../redux/apis/fetchContacts";
import { fetchTwilioids } from "../../redux/apis/fetchtwilioid";
import { conversationType, responseStatus } from "../../enums/constants";
import { initiateCall } from "../../redux/apis/voiceCall";
import { clearChatIdsAction } from "../../redux/slicers/chatIdsSlice";
import { useFocusEffect } from "@react-navigation/core";
import ModalLoader from "../../components/blockComponents/modalLoader";
import ErrorModal from "../../components/blockComponents/ErrorModal";
import { clearVoiceCallAction } from "../../redux/slicers/voiceCallSlice";

type Props = NativeStackScreenProps<RootStackParams, screenNames.LOGIN>;

const contactsTypeList = [
  {
    label: "Navigators",
    Count: 0,
    value: "Navigator",
  },
  {
    label: "Patients",
    Count: 0,
    value: "Patient",
  },
];

const Contact = (props: Props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const [recentContacts, setRecentContacts] = useState<contactType[]>([]);
  const [initialcontacts, setContacts] = useState<contactType[]>([]);
  const [sortedContacts, setSortedContacts] = useState<contactType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollIndex, setInitialScrollIndex] = useState(0);
  const [visibleFilterPanel, setVisibleFilterPanel] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [contactsTypes, setContactsTypes] = useState(contactsTypeList);
  const [loading, setLoading] = useState(true);
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<contactType[]>([]);
  const [searchText, setSearchText] = useState("");
  const { contactData, loginData, chatIDs, voiceCallResp, userProfileData } =
    useAppSelector((state) => {
      return {
        contactData: state.contactList,
        loginData: state.login,
        chatIDs: state.chatIds,
        voiceCallResp: state.voiceCall,
        userProfileData: state.profileData,
      };
    });
  const { contactList, contactError } = contactData;
  const {
    loginDetails: { userOwnerId },
  } = loginData;
  const { idsDetails } = chatIDs;
  const {
    profileData: { PhoneNumber },
  } = userProfileData;
  const { voiceCallLoading, voiceCallError } = voiceCallResp;
  const [error, setError] = useState(false);

  const [currentContact, setCurrentContact] = useState<contactType>({
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    thumbnailPath:
      "https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg",
    phoneNumber: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
  });

  let isShowRecent = false;

  const refRBSheet = useRef<any>();
  let contactListRef = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      dispatch(clearVoiceCallAction());
      dispatch(fetchContacts(userOwnerId as any));
      dispatch(clearChatIdsAction());
      return () => setLoading(true);
    }, [])
  );

  useEffect(() => {
    if (
      contactList &&
      contactList.recentContact &&
      contactList.recentContact.length > 0
    )
      setRecentContacts(contactList.recentContact);
    if (contactList && contactList["allContact"] !== undefined) {
      if (contactList.allContact && contactList.allContact.length > 0) {
        const types = contactsTypes;
        const { Navigator, Patient } = contactList.count && contactList.count;
        types[0].Count = Navigator ? Navigator : 0;
        types[1].Count = Patient ? Patient : 0;
        setContactsTypes(types);
        setContacts(contactList.allContact);
        setSortedContacts(contactList.allContact);
      }
      setLoading(false);
    }
  }, [contactList]);

  useEffect(() => {
    if (contactError) setLoading(false);
  }, [contactError]);

  useEffect(() => {
    if (voiceCallError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [voiceCallError]);

  useEffect(() => {
    if (searchText) {
      searchContact(searchText);
    }
  }, [filteredContacts]);

  useEffect(() => {
    if (idsDetails?.response === responseStatus) {
      navigation.navigate(screenNames.CHAT, {
        conversionName: `${currentContact.firstName} ${currentContact.lastName}`,
        conversationID: idsDetails.conversationID,
      });
    }
  }, [idsDetails]);

  const searchContact = (searchString: string) => {
    setSearchText(searchString);
    if (searchString.length >= 3) {
      setIsSearchEnable(true);
      setSortedContacts(sortedContactsWithSearch(searchString));
    } else {
      if (filterApplied) {
        setSortedContacts(filteredContacts);
        setIsSearchEnable(false);
      } else {
        setSortedContacts(initialcontacts);
        setIsSearchEnable(false);
      }
    }
  };
  const sortedContactsWithSearch = (searchString: string) => {
    return sortedContacts.filter((item) => {
      const searchName = `${item.firstName}${item.lastName}`;
      return searchName
        .toLowerCase()
        .replace(/ /g, "")
        .includes(searchString.toLowerCase());
    });
  };

  const onPressContact = (item: contactType) => {
    setCurrentContact(item);
    refRBSheet.current.open();
  };

  const scrollToParticularIndex = (alphabet: string) => {
    contactListRef.current.scrollToLocation({
      animated: true,
      sectionIndex: isShowRecent ? 1 : 0,
      itemIndex: getIndexOfNameFirstLatter(alphabet),
    });
  };
  const getIndexOfNameFirstLatter = (alphabet: string) => {
    let index = 0;
    for (let i = 0; i < sortedContacts.length; i++) {
      if (sortedContacts[i].firstName.toUpperCase()[0] === alphabet) {
        index = i;
        break;
      }
    }
    return index;
  };
  const openFilterPanel = () => {
    setVisibleFilterPanel(true);
  };

  const closeFilterPanel = () => {
    setVisibleFilterPanel(false);
  };

  const onPressApplyFilter = (contactType: string) => {
    batch(() => {
      setVisibleFilterPanel(false);
      if (contactType) {
        const filterContacts = initialcontacts.filter((item) => {
          return item.contactType === contactType;
        });
        setSortedContacts(filterContacts);
        setFilteredContacts(filterContacts);
        setFilterApplied(true);
      }
    });
  };

  const onPressCall = () => {
    refRBSheet.current.close();

    setTimeout(() => {
      dispatch(
        initiateCall({
          callerTo: PhoneNumber,
          recipientTo: currentContact.phoneNumber,
          participantId: currentContact.userId,
        })
      );
    }, 300);
  };

  const onPressMessage = () => {
    refRBSheet.current.close();
    const data = {
      participantsUserId: [userOwnerId, currentContact.userId],
      type: conversationType.GENERAL,
      ownerUserId: userOwnerId,
      tag: null,
    };
    dispatch(fetchTwilioids(data));
  };

  const onPressClearFilter = () => {
    batch(() => {
      setSortedContacts(initialcontacts);
      setFilteredContacts([]);
      setVisibleFilterPanel(false);
      setFilterApplied(false);
    });
  };

  const getContactsData = () => {
    if (filterApplied) {
      isShowRecent = false;
      return [{ title: sortedContacts[0].contactType, data: sortedContacts }];
    } else if (recentContacts && recentContacts.length > 0 && !isSearchEnable) {
      isShowRecent = true;
      return [
        { title: translate.t(langVar.recent), data: recentContacts },
        { title: translate.t(langVar.all), data: sortedContacts },
      ];
    } else {
      isShowRecent = false;
      return [{ title: translate.t(langVar.all), data: sortedContacts }];
    }
  };

  const getHeaderName = () => {
    return sortedContacts.length > 0
      ? `Contacts(${sortedContacts.length})`
      : `Contacts`;
  };

  const renderSearch = () => {
    if (contactList && !contactList.allContact && !isSearchEnable) return null;
    return (
      <SearchBox
        placeholder={translate.t(langVar.searchPeople)}
        onTextChange={(searchString: string) => searchContact(searchString)}
        searchEnabled={isSearchEnable}
      />
    );
  };
  const renderContacts = () => {
    return (
      <View style={styles.container}>
        {renderSearch()}
        {sortedContacts.length > 0 && (
          <View style={styles.contactAlphabetView}>
            <View style={styles.contactView}>
              <ContactList
                setRef={(ref: any) => (contactListRef = ref)}
                scrollIndex={scrollIndex}
                data={getContactsData()}
                onPressContact={(item: contactType) => onPressContact(item)}
              />
            </View>
            <View style={styles.alphabetView}>
              <AlphabetsContainer
                onAlphabetClick={scrollToParticularIndex}
                alphaArray={getAlphabetsArray()}
              />
            </View>
          </View>
        )}

        {isSearchEnable ? (
          <NotFoundOrError
            type={"noContactsFound"}
            enableIcon={sortedContacts.length === 0}
          />
        ) : (
          <NotFoundOrError
            type={"noContactsAvailable"}
            enableIcon={sortedContacts.length === 0}
          />
        )}
        <BottomSheet
          currentContact={currentContact}
          refRBSheet={refRBSheet}
          onPressCall={onPressCall}
          onPressMessage={onPressMessage}
          isCallDisable={!PhoneNumber && !currentContact.phoneNumber}
        />
      </View>
    );
  };

  return (
    <ContainerView style={styles.container as ViewStyle}>
      <ContactFilterPanel
        contactTypes={contactsTypeList}
        visible={visibleFilterPanel}
        onDismiss={closeFilterPanel}
        onPressApplyFilter={(filteredContactsType) =>
          onPressApplyFilter(filteredContactsType)
        }
        onPressClearFilter={onPressClearFilter}
      />
      <ModalLoader isVisible={voiceCallLoading} />
      <ErrorModal
        isVisible={error}
        currentContactName={`${currentContact.firstName} ${currentContact.lastName}`}
        onPress={() => {
          setError(!error);
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.paddingAround}>
          <NavigationHeader
            navigationTitle={getHeaderName()}
            isFilterRequired={
              contactList ? contactList.allContact : !contactError
            }
            onPressFilterIcon={openFilterPanel}
            isFilterApplied={filterApplied}
          />
          {contactError ? (
            <NotFoundOrError type={"error"} enableIcon={true} />
          ) : (
            renderContacts()
          )}
        </View>
      )}
    </ContainerView>
  );
};

export default Contact;
