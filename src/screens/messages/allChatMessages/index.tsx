import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppButton,
  AppText,
  ContainerView,
  GroupImages,
  Loader,
  SearchBox,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import NavigationHeader from "../../../components/blockComponents/navigationHeader";
import { CreateConversion } from "../../../utils/imagePaths";
import { FlatList, View, ViewStyle } from "react-native";
import {
  getDateFormatForDay,
  getLocaleTime,
  isAndroid,
} from "../../../utils/utils";
import styles from "./styles";
import { langVar, screenNames, themes, translate } from "../../../enums";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import { getAllConversationList } from "../../../redux/apis/messagesAPI";
import EventHOC from "../../../components/baseComponents/eventHOC";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { NativeEventEmitter, NativeModules } from "react-native";
import { clearChatIdsAction } from "../../../redux/slicers/chatIdsSlice";

const AllChatMessages = () => {
  const dispatch = useAppDispatch();
  const { conversationList = [], conversationListError } = useAppSelector(
    (state) => state.message
  );
  const { loginDetails } = useAppSelector((state) => state.login);
  const navigation = useNavigation<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataProvider, setDataProvider] = useState([]);
  const { configData } = useAppSelector((state) => state.configData);
  const { PageSizeForConversationList } = configData;
  const textInputRef = useRef<any>(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [isocused, setisocused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let eventListener: any = null;
    if (isAndroid()) {
      const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
      eventListener = eventEmitter.addListener("getAllConversations", () => {
        setisocused((isFocsedPrev) => {
          setSearchText((searchTextPrev) => {
            if (isFocsedPrev) searchMessages(searchTextPrev);
            return searchTextPrev;
          });
          return isFocsedPrev;
        });
      });
    } else {
      const nativeEventSupport = new NativeEventEmitter(
        NativeModules.NativeEventManager
      );
      nativeEventSupport.addListener("getAllConversations", () => {
        setisocused((isFocsedPrev) => {
          setSearchText((searchTextPrev) => {
            if (isFocsedPrev) searchMessages(searchTextPrev);
            return searchTextPrev;
          });
          return isFocsedPrev;
        });
      });
    }
    return () => {
      dispatch(clearChatIdsAction());
      if (eventListener) eventListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setisocused((prev) => true);
      setSearchText("");
      searchMessages("");
      return () => setisocused(false);
    }, [])
  );

  useEffect(() => {
    if (conversationList && !conversationList.conversationDetails) {
      setLoading(false);
      setDataProvider([]);
    } else if (conversationList && conversationList.conversationDetails) {
      setDataProvider(conversationList.conversationDetails);
      setLoading(false);
    } else {
      setDataProvider([]);
    }
  }, [conversationList]);

  const navigateToCreateConversion = () => {
    navigation.navigate(screenNames.CREATECONVERSION);
  };

  const searchMessages = (text: string) => {
    if (text && text.length > 2) {
      dispatch(
        getAllConversationList({
          userID: loginDetails.userOwnerId,
          searchKeyword: text,
          limit: PageSizeForConversationList,
          offset: 0,
        })
      );
      setSearchText(text);
    } else {
      setSearchEnabled(true);
      setSearchText(text);

      if (text.length === 0) {
        setSearchEnabled(false);
        dispatch(
          getAllConversationList({
            userID: loginDetails.userOwnerId,
            searchKeyword: "",
            limit: 100,
            offset: 0,
          })
        );
      }
    }
  };

  const navigateToChat = (
    conversionName: string,
    conversationID: number,
    twilioConversationId: string,
    participantDetails: string,
    searchMessageIndex: string
  ) => {
    navigation.navigate(screenNames.CHAT, {
      conversionName,
      conversationID,
      twilioConversationId,
      participantDetails,
      messageIndex: searchMessageIndex,
    });
    if (textInputRef.current) textInputRef.current.clear();
  };

  const renderItems = ({ item, index }: any) => {
    const {
      name,
      conversationID,
      twilioConversationId,
      lastMessageContent,
      lastMessageDateTime,
      type,
      groupConversationIcon,
      participantDetails,
      searchMessageIndex,
    } = item;
    //TODO: need to write logic
    const isUnread = false;
    return (
      <View
        style={[
          { flex: 1 },
          styles.paddingLeftRight,
          { backgroundColor: isUnread ? themes.unredMessageBG : themes.White },
        ]}
      >
        <AppButton
          onPress={() =>
            navigateToChat(
              name,
              conversationID,
              twilioConversationId,
              participantDetails,
              searchMessageIndex
            )
          }
          style={styles.row as ViewStyle}
        >
          <View style={styles.col1}>
            <GroupImages
              groupConversationIcon={groupConversationIcon}
              name={name}
            />
          </View>
          <View style={styles.col2}>
            <View style={styles.nameDate}>
              <AppText
                searchKeywords={[searchText]}
                style={styles.name}
                numberOfLines={1}
              >
                {name}
              </AppText>
              <AppText style={styles.date}>
                {getDateFormatForDay(lastMessageDateTime, "MMM DD") +
                  " " +
                  getLocaleTime(lastMessageDateTime, "hh:mm a")}
              </AppText>
            </View>
            <AppText
              searchKeywords={[searchText]}
              style={styles.message}
              numberOfLines={1}
            >
              {lastMessageContent}
            </AppText>
            <View style={styles.badge}>
              <AppText style={styles.convesionType}>{type}</AppText>
            </View>
          </View>
        </AppButton>
        {conversationList &&
          conversationList.conversationDetails &&
          searchText.length > 0 &&
          index === conversationList.conversationDetails.length - 1 && (
            <AppText style={styles.resultFoundLabel}>{`${
              conversationList.conversationDetails.length
            } ${
              conversationList.conversationDetails.length > 1
                ? translate.t(langVar.resultsFound)
                : translate.t(langVar.resultFound)
            }`}</AppText>
          )}
      </View>
    );
  };

  const isConvoExist =
    conversationList &&
    conversationList.conversationDetails &&
    conversationList.conversationDetails.length > 0;
  return (
    <ContainerView style={styles.container as ViewStyle} hideStatusSpacer>
      <View style={styles.paddingLeftRight}>
        <NavigationHeader
          navigationTitle={`${translate.t(langVar.Messages)}(${
            dataProvider.length
          })`}
          isFilterRequired={true}
          rightIcontestID={"createConvoID"}
          RightIcon={CreateConversion}
          onPressFilterIcon={navigateToCreateConversion}
          isFilterApplied={filterApplied}
        />
      </View>
      {!conversationListError && (
        <View style={styles.paddingLeftRight}>
          <SearchBox
            initialValue={searchText}
            getReference={(ref: any) => (textInputRef.current = ref)}
            searchEnabled={searchEnabled}
            style={styles.search as ViewStyle}
            onTextChange={searchMessages}
          />
        </View>
      )}

      {searchText.length === 0 && loading ? (
        <Loader />
      ) : !conversationListError ? (
        <>
          {isConvoExist && (
            <FlatList
              keyboardShouldPersistTaps={true}
              data={dataProvider}
              renderItem={renderItems}
            />
          )}
          <NotFoundOrError
            verticalOffset={0}
            enableIcon={!isConvoExist}
            type={"emptyInbox"}
          />
        </>
      ) : (
        <NotFoundOrError enableIcon={true} type={"error"} />
      )}
    </ContainerView>
  );
};

export default EventHOC(AllChatMessages);
