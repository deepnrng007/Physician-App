import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ContainerView,
  EpisodeFilter,
  HorizontalFormList,
  OnTrackPatientsList,
  SearchBox,
  TitleWithFilter,
  useAppDispatch,
  useAppSelector,
  TitleIconCount,
} from "../../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { langVar, screenNames, translate } from "../../../enums";
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import {
  EmptyOnTrackIcon,
  LocationIcon,
  OffTrackEmptyIcon,
  OffTrackIcon,
} from "../../../utils/imagePaths";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import EventHOC from "../../../components/baseComponents/eventHOC";
import { fetchEpisode } from "../../../redux/apis/fetchEpisodeList";
import logger from "../../../utils/logger";
import { getFilterRequest, getMappedResponse } from "./helper";
import { global } from "../../../global";
import { useFocusEffect } from "@react-navigation/core";
import { isAndroid } from "../../../utils/utils";

type Props = NativeStackScreenProps<RootStackParams, screenNames.EPISODELIST>;

const EpisodeList = (props: Props | any) => {
  const { navigation, isKeyboardVisible } = props;
  const dispatch = useAppDispatch();
  const [visibleFilterPanel, setVisibleFilterPanel] = useState(false);
  const [filterData, setFilterData] = useState<any>(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allData, setallData] = useState<any>([]);
  const [searchResult, setSearchResult] = useState<any>(allData);
  const [offtrackData, setOfftrackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScreenFocus, setIsScreenFocus] = useState(false);
  const { episodeError, episodeList } = useAppSelector(
    (state) => state.episodeList
  );
  const textInputRef = useRef<any>(null);
  const { configData } = useAppSelector((state) => state.configData);
  const { IntakeStatuses, LocationTypesForFilters = [] } = configData;
  const [locationList, setLocationList] = useState([
    {
      ID: -1,
      Name: "ALL",
      DisplayName: "ALL",
      Count: 0,
    },
    ...LocationTypesForFilters,
  ]);

  const searchPatients = (text: string) => {
    if (text && text.length > 2) {
      setSearchResult(
        allData.filter((item: any) => {
          const searchText = text.toLowerCase().replace(/ /g, "");
          return (item.PatientFirstName + item.PatientLastName)
            .toLowerCase()
            .replace(/ /g, "")
            .includes(searchText);
        })
      );
      setSearchText(text);
      setSearchEnabled(true);
    } else {
      setSearchText("");
      setSearchEnabled(false);
    }
  };

  const isFilterSearchorApplied = () => {
    return searchEnabled || filterData ? true : false;
  };

  useFocusEffect(
    useCallback(() => {
      setIsScreenFocus(true);
      if (global.PREVIOUSSCREEN === screenNames.EPISODEDETAILS) {
        setLoading(false);
        global.PREVIOUSSCREEN = null;
      } else {
        global.PREVIOUSSCREEN = null;
        searchPatients("");
        if (textInputRef.current) textInputRef.current.clear();
        filterCleared();
      }
      let eventListener: any = null;
      if (isAndroid()) {
        const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
        eventListener = eventEmitter.addListener("getEpisodeListEvent", () => {
          reload();
        });
      } else {
        const nativeEventSupport = new NativeEventEmitter(
          NativeModules.NativeEventManager
        );
        nativeEventSupport.addListener("getEpisodeListEvent", () => {
          reload();
        });
      }
      return () => {
        setIsScreenFocus(false);
        setLoading(true);
        if (eventListener) eventListener.remove();
      };
    }, [])
  );
  const reload = () => {
    closeFilterPanel();
    setFilterData((prev: any) => {
      if (prev !== null) {
        dispatch(fetchEpisode(getFilterRequest(prev)));
        closeFilterPanel();
      } else {
        dispatch(fetchEpisode({}));
        closeFilterPanel();
      }
      return prev;
    });
  };

  useEffect(() => {
    if (episodeError) setLoading(false);
  }, [episodeError]);

  useEffect(() => {
    if (
      episodeList &&
      episodeList.offtrackPatients &&
      episodeList.ontrackPatients &&
      isScreenFocus
    ) {
      const count: any = episodeList.count;
      if (locationList[0].Count === 0) {
        const locList =
          locationList &&
          locationList.map((item) => {
            const { Name } = item;
            return {
              ...item,
              Count:
                count &&
                count.LocationBasedCount &&
                count.LocationBasedCount[Name]
                  ? count.LocationBasedCount[Name]
                  : 0,
            };
          });
        setLocationList(locList);
      }
      // setSearchResult([]);
      setallData([
        ...episodeList.offtrackPatients,
        ...episodeList.ontrackPatients,
      ]);
      setOfftrackData(getMappedResponse(episodeList.offtrackPatients));
      setLoading(false);
    }
  }, [episodeList]);

  useEffect(() => {
    if (
      episodeList &&
      episodeList.offtrackPatients &&
      episodeList.ontrackPatients
    ) {
      searchText && searchPatients(searchText);
    }
  }, [allData]);

  const openFilterPanel = () => {
    setVisibleFilterPanel(true);
  };

  const closeFilterPanel = () => {
    setVisibleFilterPanel(false);
  };

  const updateLoader = () => {
    setLoading(false);
  };
  const navigateTo = (item: any) => {
    navigation.navigate(screenNames.EPISODEDETAILS, {
      patientData: item,
      updateLoader,
    });
  };

  const filterApplied = (data: any) => {
    setLoading(true);
    dispatch(fetchEpisode(getFilterRequest(data)));
    setFilterData(data);
    closeFilterPanel();
  };
  const filterCleared = () => {
    setFilterData(null);
    setLoading(true);
    dispatch(fetchEpisode({}));
    closeFilterPanel();
  };

  const renderhorizontal = () => {
    const data =
      episodeList &&
      episodeList.offtrackPatients &&
      episodeList.offtrackPatients;
    return !(isFilterSearchorApplied() && data && data.length === 0) ? (
      <HorizontalFormList
        searchEnabled={searchEnabled}
        count={data && data.length}
        screenName={screenNames.EPISODELIST}
        style={styles.horizontalLisStyle as ViewStyle}
        Icon={OffTrackIcon}
        title={translate.t(langVar.OffTracksPatients)}
        list={offtrackData}
        emptyIcon={OffTrackEmptyIcon}
        emptyStateTitle={translate.t(langVar.emptyoffTrackTitle)}
        emptyStateMssage={translate.t(langVar.emptyOffTrackDesc)}
        onPress={navigateTo}
        testID={"episodeOffTrackCard"}
      />
    ) : null;
  };

  const renderOnTrack = () => {
    const data =
      episodeList && episodeList.ontrackPatients && episodeList.ontrackPatients;
    return (
      <View
        style={[
          styles.titleWithFilter,
          !isKeyboardVisible && styles.approvedList,
        ]}
      >
        <OnTrackPatientsList
          searchEnabled={searchEnabled}
          searchText={searchText}
          list={searchEnabled ? searchResult : data && data}
          onPress={navigateTo}
          emptyIcon={EmptyOnTrackIcon}
          emptyStateTitle={translate.t(langVar.oops)}
          emptyStateMssage={translate.t(langVar.nootherPatients)}
        />
      </View>
    );
  };

  const renderUI = () => {
    if (searchResult.length > 0 && searchEnabled)
      return (
        <ContainerView
          style={styles.container as ViewStyle}
          isScrollEnable
          enableSafeArea={false}
        >
          {renderOnTrack()}
        </ContainerView>
      );
    else if (searchResult.length === 0 && searchEnabled) {
      return null;
    } else {
      const uiList = [];
      const data =
        episodeList &&
        episodeList.ontrackPatients &&
        episodeList.ontrackPatients;
      uiList.push(renderhorizontal());
      if (!(isFilterSearchorApplied() && data && data.length === 0)) {
        uiList.push(
          <TitleIconCount
            title={translate.t(langVar.otherPatients)}
            Icon={LocationIcon}
            count={data && data.length}
            style={styles.titleCount as ViewStyle}
          />
        );
        uiList.push(renderOnTrack());
      }
      return (
        <FlatList
          data={uiList}
          stickyHeaderIndices={[1]}
          renderItem={({ item }) => item}
        />
      );
    }
  };

  if (episodeError && episodeError !== "") {
    return (
      <View style={styles.loaderView}>
        <NotFoundOrError type="error" enableIcon={true} />
      </View>
    );
  }

  const totalCount =
    episodeList &&
    episodeList.offtrackPatients &&
    episodeList.ontrackPatients &&
    episodeList.offtrackPatients.length + episodeList.ontrackPatients.length;

  const checkConditionforoops = () => {
    if (isFilterSearchorApplied()) {
      if (totalCount === 0) return true;
      if (searchEnabled && searchResult.length === 0) return true;
    }
    return false;
  };
  return (
    <ContainerView
      style={styles.container as ViewStyle}
      loading={loading}
      enableSafeArea={false}
    >
      {visibleFilterPanel && (
        <EpisodeFilter
          locationList={locationList}
          filteredData={filterData}
          visible={visibleFilterPanel}
          intakeStatus={IntakeStatuses}
          onDismiss={closeFilterPanel}
          onFilterApply={filterApplied}
          onFilterClear={filterCleared}
        />
      )}
      <View style={styles.titleWithFilter}>
        <TitleWithFilter
          count={searchEnabled ? searchResult.length : totalCount}
          pendingNotification={filterData !== null}
          title={translate.t(langVar.episodeTab)}
          openFilterPanel={openFilterPanel}
          style={styles.filterContainer as ViewStyle}
        />
        <SearchBox
          initialValue={searchText}
          getReference={(ref: any) => (textInputRef.current = ref)}
          searchEnabled={searchEnabled}
          onTextChange={searchPatients}
          placeholder="Search by patient name"
        />
      </View>
      {totalCount && totalCount > 0
        ? renderUI()
        : !isFilterSearchorApplied() && (
            <NotFoundOrError enableIcon={true} type={"noEpisodesFound"} />
          )}
      <NotFoundOrError
        enableIcon={checkConditionforoops()}
        verticalOffset={0}
        type={"episodeOopsNotFound"}
      />
    </ContainerView>
  );
};

export default EventHOC(EpisodeList);
