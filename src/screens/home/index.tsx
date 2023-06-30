import {
  ContainerView,
  HorizontalFormList,
  LastFewMessages,
  useAppDispatch,
  useAppSelector,
} from "../../components";
import React, { useCallback, useEffect, useState } from "react";
import { langVar, screenNames, translate } from "../../enums";
import styles from "./styles";
import { View, ViewStyle } from "react-native";
import {
  OffTrackIcon,
  PendingTocsIcon,
  emptyToCIcon,
  EmptyMessageIcon,
  OffTrackEmptyIcon,
} from "../../utils/imagePaths";
import { fetchEpisode } from "../../redux/apis/fetchEpisodeList";
import { getAllConversationList } from "../../redux/apis/messagesAPI";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import { fetchAccessToken } from "../messages/helper";
import EventHOC from "../../components/baseComponents/eventHOC";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { fetchTocList } from "../../redux/apis/fetchTocList";
import { formatPendingTocList } from "../TOCs/helpter";
import { getMappedResponse } from "../episodes/episodesList/helper";
import { global } from "../../global";
import { fetchConfig } from "../../redux/apis/fetchConfig";
import { fetchProviderProfile } from "../../redux/apis/fetchProviderProfile";
import { getConversationCount, setTwilioClient } from "../helper";
import { responseStatus } from "../../enums/constants";
import EnableTouchIDModal from "../../components/blockComponents/enableTouchIDModal";

type Props = {
  isAppInForground: boolean;
};

const Home = ({ isAppInForground }: Props) => {
  const [pendingTocsList, setPendingTocsList] = useState<any>({});
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [conversationCount, setConversationCount] = useState(0);
  const [visibleTouchIDPopUp, setvisibleTouchIDPopUp] = useState(
    global.ISFIRSTTIMELOGGED
  );

  useEffect(() => {
    if (isAppInForground) getAccessToken();
  }, [isAppInForground]);

  const getAccessToken = async () => {
    const res = await fetchAccessToken(global.OWNER_EMAILID as any);
    if (res) {
      const { msgAccessToken } = res;
      if (msgAccessToken) setTwilioClient(msgAccessToken);
    }
  };

  const dispatch = useAppDispatch();
  const {
    episodeListData,
    conversationListData,
    loginData,
    tocListData,
    configDataResp,
    userProfileData,
  } = useAppSelector((state) => {
    return {
      episodeListData: state.episodeList,
      conversationListData: state.message,
      loginData: state.login,
      tocListData: state.tocList,
      configDataResp: state.configData,
      userProfileData: state.profileData,
    };
  });

  const { episodeError, episodeList } = episodeListData;
  const { conversationList = [], conversationListError } = conversationListData;
  const { tocListDetails, tocLitError } = tocListData;
  const { configData, configError } = configDataResp;
  const { loginDetails } = loginData;
  const { profileData, profileError } = userProfileData;

  const getDataWitAllApis = async () => {
    const userId = loginDetails && loginDetails.userOwnerId;
    const result = await getConversationCount(userId);
    const { count, response } = result;
    if (response === responseStatus) {
      setConversationCount(count);
    }
  };

  useEffect(() => {
    if (
      episodeError !== null ||
      conversationListError !== null ||
      tocLitError !== null ||
      configError !== null ||
      profileError !== null
    )
      setLoading(false);
  }, [
    episodeError,
    conversationListError,
    tocLitError,
    configError,
    profileError,
  ]);
  useFocusEffect(
    useCallback(() => {
      getDataWitAllApis();
      setLoading(true);
      dispatch(fetchConfig());
      if (loginDetails)
        dispatch(fetchProviderProfile(loginDetails.userOwnerId));
      return () => {
        setvisibleTouchIDPopUp(false);
      };
    }, [])
  );
  useEffect(() => {
    if (
      loginDetails &&
      configData &&
      configData["PageSizeForConversationList"] !== undefined &&
      profileData &&
      profileData["PhoneNumber"] !== undefined
    ) {
      getDataWitAllApis();
      getConversationList(1000);
      dispatch(fetchEpisode({}));
      getAllToCListData();
    }
  }, [configData, profileData]);

  useEffect(() => {
    if (tocListDetails && tocListDetails.ToCList) {
      const { Pending = [] } = tocListDetails.ToCList;
      const pendingtoc = formatPendingTocList(Pending);
      setPendingTocsList(pendingtoc);
    }
  }, [tocListDetails]);

  useEffect(() => {
    if (
      conversationList &&
      conversationList["conversationDetails"] !== undefined
    )
      setLoading(false);
  }, [conversationList]);

  const getConversationList = (limit: number) => {
    const params = {
      userID: loginDetails && loginDetails.userOwnerId,
      searchKeyword: "",
      limit: limit,
      offset: 0,
    };
    dispatch(getAllConversationList(params));
  };

  const getAllToCListData = () => {
    const params = {
      offset: 0,
      limit: 1000,
      status: "all",
    };
    dispatch(fetchTocList(params));
  };

  const navigateToTocs = (item: any) => {
    navigation.navigate(screenNames.TOCDETAILS, {
      intakeID: item.IntakeID,
      count: item.totalCount,
    });
  };

  const navigateTooffTrack = (item: any) => {
    navigation.navigate(screenNames.EPISODEDETAILS, { patientData: item });
  };

  const navigateToMessages = (item: any) => {
    const { name, conversationID, twilioConversationId, participantDetails } =
      item;
    navigation.navigate(screenNames.CHAT, {
      conversionName: name,
      conversationID,
      twilioConversationId,
      participantDetails,
    });
  };

  const navigateToMessageList = () => {
    navigation.navigate(screenNames.ALLCHATMESSAGES);
  };

  if (episodeError || conversationListError || tocLitError || configError) {
    return (
      <View style={styles.loaderView}>
        <NotFoundOrError type="error" enableIcon={true} />
      </View>
    );
  }

  const navigateToTouchEnable = () => {
    setvisibleTouchIDPopUp(false);
    setTimeout(() => {
      navigation.navigate(screenNames.FACEIDTOUCHIDENABLE);
    }, 200);
  };

  return (
    <ContainerView
      style={styles.container as ViewStyle}
      isScrollEnable={true}
      loading={loading}
      isOvalRequired
      enableSafeArea={false}
    >
      <EnableTouchIDModal
        visible={visibleTouchIDPopUp}
        onPressEnable={navigateToTouchEnable}
        onPressSkip={() => setvisibleTouchIDPopUp(false)}
      />
      <HorizontalFormList
        testID={"pendingTOCHome"}
        accessibilityLabel={"pendingTOCHome"}
        count={pendingTocsList.length}
        Icon={PendingTocsIcon}
        title={translate.t(langVar.PendingTocs)}
        list={pendingTocsList}
        emptyIcon={emptyToCIcon}
        emptyStateTitle={translate.t(langVar.emptyTOCPendingTitle)}
        emptyStateMssage={translate.t(langVar.emptyTOCPendingDesc)}
        onPress={navigateToTocs}
      />
      <HorizontalFormList
        testID={"offTrackPatientsHome"}
        accessibilityLabel={"offTrackPatientsHome"}
        count={
          episodeList &&
          episodeList.offtrackPatients &&
          episodeList.offtrackPatients.length
        }
        style={styles.horizontalLisStyle as ViewStyle}
        Icon={OffTrackIcon}
        title={translate.t(langVar.OffTracksPatients)}
        list={episodeList && getMappedResponse(episodeList.offtrackPatients)}
        emptyIcon={OffTrackEmptyIcon}
        emptyStateTitle={translate.t(langVar.emptyoffTrackTitle)}
        emptyStateMssage={translate.t(langVar.emptyOffTrackDesc)}
        onPress={navigateTooffTrack}
      />
      <LastFewMessages
        countValue={conversationCount}
        limit={configData && configData?.ConversationsCountOnHomeScreen}
        list={conversationList && conversationList.conversationDetails}
        style={
          [
            styles.horizontalLisStyle,
            conversationList &&
              conversationList.conversationDetails === null && {
                padding: 0,
              },
          ] as ViewStyle
        }
        testID={"MessagesListsHome"}
        accessibilityLabel={"MessagesListsHome"}
        emptyIcon={EmptyMessageIcon}
        emptyStateTitle={translate.t(langVar.emptyMessageTitle)}
        emptyStateMssage={translate.t(langVar.emptyMessagesDesc)}
        onPress={navigateToMessages}
        navigateToMessageList={navigateToMessageList}
      />
    </ContainerView>
  );
};

export default EventHOC(Home);
