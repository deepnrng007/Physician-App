import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  View,
  ViewStyle,
} from "react-native";
import {
  ApprovedTocsList,
  ContainerView,
  HorizontalFormList,
  SearchBox,
  TitleIconCount,
  TitleWithFilter,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import TocFilters from "../../../components/blockComponents/tocFilters";
import { langVar, screenNames, translate } from "../../../enums";
import {
  EmptyApprovedIcon,
  emptyToCIcon,
  PendingTocsIcon,
} from "../../../utils/imagePaths";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { fetchTocList } from "../../../redux/apis/fetchTocList";
import {
  formatPendingTocList,
  formatTocApprovedList,
  getToCRequest,
} from "./../helpter";
import EventHOC from "../../../components/baseComponents/eventHOC";
import { global } from "../../../global";
import { useFocusEffect } from "@react-navigation/core";
import { isAndroid } from "../../../utils/utils";
import logger from "../../../utils/logger";

type Props = NativeStackScreenProps<RootStackParams, screenNames.TOCSLIST>;

const locationData = [
  {
    label: "All",
    Count: 0,
    DisplayName: "All",
  },
  {
    label: "Approved",
    Count: 0,
    DisplayName: "Approved",
  },
  {
    label: "Pending",
    Count: 0,
    DisplayName: "Pending",
  },
];

const TocsList = ({ navigation, isKeyboardVisible }: Props | any) => {
  const [pendingTocsList, setPendingTocsList] = useState<any>({});
  const [approvedList, setApprovedList] = useState([]);
  const [visibleFilterPanel, setVisibleFilterPanel] = useState(false);
  const [filterData, setFilterData] = useState<any>(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allData, setAllData] = useState<any>([]);
  const [searchResult, setSearchResult] = useState(allData);
  const [loading, setLoading] = useState(true);
  const textInputRef = useRef<any>(null);
  const [locationList, setLocationList] = useState(locationData);
  const dispatch = useAppDispatch();
  const { tocListDetails, tocListLoading, tocLitError } = useAppSelector(
    (state) => state.tocList
  );
  const openFilterPanel = () => {
    setVisibleFilterPanel(true);
  };

  useEffect(() => {
    // setAllData([] as any);
    // setSearchResult([] as any);
    // setApprovedList([]);
    // setPendingTocsList([]);
    if (tocListDetails && tocListDetails.ToCList) {
      const { Pending = [], Approved = [] } = tocListDetails.ToCList;
      const list = locationData;
      if (!filterData) {
        list[0].Count =
          tocListDetails.Count.Approved + tocListDetails.Count.Pending;
        list[1].Count = tocListDetails.Count.Approved;
        list[2].Count = tocListDetails.Count.Pending;
      }
      setLocationList(list);
      const approvedToc = formatTocApprovedList(Approved);
      const pendingtoc = formatPendingTocList(Pending);
      setAllData([...pendingtoc, ...approvedToc] as any);
      setApprovedList(approvedToc);
      setPendingTocsList(pendingtoc);
    }
  }, [tocListDetails]);
  const isFilterSearchorApplied = () => {
    return searchEnabled || filterData ? true : false;
  };

  useEffect(() => {
    if (tocListDetails && tocListDetails.ToCList) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (searchEnabled) searchPatients(searchText);
    }
  }, [allData]);

  useFocusEffect(
    useCallback(() => {
      if (
        global.PREVIOUSSCREEN === screenNames.TOCDETAILS &&
        !global.ISPREVIOUSTOCAPPROVED
      ) {
        setLoading(false);
        global.PREVIOUSSCREEN = null;
      } else {
        global.PREVIOUSSCREEN = null;
        global.ISPREVIOUSTOCAPPROVED = false;
        searchPatients("");
        if (textInputRef.current) textInputRef.current.clear();
        filterCleared();
      }

      let eventListener: any = null;
      if (isAndroid()) {
        const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
        eventListener = eventEmitter.addListener("getTocListEvent", () => {
          reload();
        });
      } else {
        const nativeEventSupport = new NativeEventEmitter(
          NativeModules.NativeEventManager
        );
        nativeEventSupport.addListener("getTocListEvent", () => {
          reload();
        });
      }
      return () => {
        setLoading(true);
        if (eventListener) eventListener.remove();
      };
    }, [])
  );

  useEffect(() => {
    if (tocLitError) {
      setLoading(false);
    }
  }, [tocLitError]);

  const getToCListData = (extraprams = {}) => {
    const params = {
      offset: 0,
      limit: 1000,
      status: "all",
      ...extraprams,
    };
    dispatch(fetchTocList(params));
  };

  const searchPatients = (text: string) => {
    if (text && text.length > 2) {
      const searchText = text.toLowerCase().replace(/ /g, "");
      setSearchResult(
        allData.filter((item: any) =>
          item?.patientName
            ?.toLowerCase()
            .replace(/ /g, "")
            .includes(searchText)
        )
      );
      setSearchText(text);
      setSearchEnabled(true);
    } else {
      setSearchEnabled(false);
      setSearchText("");
    }
  };

  const updateLoader = () => {
    setLoading(false);
  };

  const navigateTo = (item: any) => {
    navigation.navigate(screenNames.TOCDETAILS, {
      intakeID: item.IntakeID,
      count: item.totalCount,
      updateLoader,
    });
  };
  const closeFilterPanel = () => {
    setVisibleFilterPanel(false);
  };

  const reload = () => {
    closeFilterPanel();
    const params = getToCRequest(filterData);
    getToCListData(params);
  };

  const filterApplied = (data: any) => {
    setFilterData(data);
    closeFilterPanel();
    const params = getToCRequest(data);
    setLoading(true);
    getToCListData(params);
  };
  const filterCleared = () => {
    setFilterData(null);
    closeFilterPanel();
    setLoading(true);
    getToCListData();
  };

  const renderHorizontal = () => {
    return !(
      isFilterSearchorApplied() &&
      pendingTocsList &&
      pendingTocsList.length === 0
    ) ? (
      <HorizontalFormList
        accessibilityLabel={"pendingTocsID"}
        testID={"pendingTocsID"}
        searchEnabled={searchEnabled}
        count={pendingTocsList.length}
        screenName={screenNames.TOCSLIST}
        style={styles.horizontalLisStyle as ViewStyle}
        Icon={PendingTocsIcon}
        title={translate.t(langVar.PendingTocs)}
        list={pendingTocsList}
        emptyIcon={emptyToCIcon}
        emptyStateTitle={translate.t(langVar.emptyTOCPendingTitle)}
        emptyStateMssage={translate.t(langVar.emptyTOCPendingDesc)}
        onPress={navigateTo}
      />
    ) : null;
  };

  const renderApprovedToc = () => {
    const dataList = searchEnabled ? searchResult : [...approvedList];
    return (
      <View
        style={[
          styles.approvedTocs,
          !isKeyboardVisible && styles.approvedBottom,
        ]}
      >
        <ApprovedTocsList
          testID={"aprrovedTocsID"}
          isTitleVisible={false}
          searchText={searchText}
          searchEnabled={searchEnabled}
          Icon={PendingTocsIcon}
          list={dataList}
          onPress={navigateTo}
          emptyIcon={EmptyApprovedIcon}
          emptyStateTitle={translate.t(langVar.oops)}
          emptyStateMssage={translate.t(langVar.noApprovedTocs)}
        />
      </View>
    );
  };

  const renderUI = () => {
    if (searchResult.length > 0 && searchEnabled) {
      return (
        <ContainerView
          style={[styles.container] as ViewStyle}
          isScrollEnable
          enableSafeArea={false}
        >
          {renderApprovedToc()}
        </ContainerView>
      );
    } else if (searchResult.length === 0 && searchEnabled) return null;
    else {
      const uiList = [];
      const dataList = searchEnabled ? searchResult : [...approvedList];
      uiList.push(renderHorizontal());
      if (!(isFilterSearchorApplied() && dataList && dataList.length === 0)) {
        uiList.push(
          <TitleIconCount
            Icon={PendingTocsIcon}
            style={styles.titleCount as ViewStyle}
            title={translate.t(langVar.approvedTocs)}
            count={searchEnabled ? searchResult.length : approvedList.length}
          />
        );
        uiList.push(renderApprovedToc());
      }
      return (
        <ContainerView
          style={[styles.container] as ViewStyle}
          enableSafeArea={false}
        >
          <FlatList
            data={uiList}
            stickyHeaderIndices={[1]}
            renderItem={({ item }) => item}
          />
        </ContainerView>
      );
    }
  };

  const totalCount = pendingTocsList.length + approvedList.length;

  const checkConditionforoops = () => {
    if (isFilterSearchorApplied()) {
      if ((totalCount === 0 || searchEnabled) && searchResult.length === 0) {
        return true;
      }
    }
    return false;
  };
  return (
    <ContainerView
      style={[styles.container] as ViewStyle}
      loading={loading}
      enableSafeArea={false}
    >
      {visibleFilterPanel && (
        <TocFilters
          locationList={locationList}
          filteredData={filterData}
          onFilterApply={filterApplied}
          onFilterClear={filterCleared}
          visible={visibleFilterPanel}
          onDismiss={closeFilterPanel}
        />
      )}
      {!tocLitError && (
        <>
          <View style={styles.titleWithFilter}>
            <TitleWithFilter
              testID={"filterTocsID"}
              count={searchEnabled ? searchResult.length : totalCount}
              pendingNotification={filterData !== null}
              title={translate.t(langVar.tocTab)}
              openFilterPanel={openFilterPanel}
              style={styles.filterContainer as ViewStyle}
            />
            <SearchBox
              initialValue={searchText}
              getReference={(ref: any) => (textInputRef.current = ref)}
              testID={"searchTocsID"}
              searchEnabled={searchEnabled}
              onTextChange={searchPatients}
              placeholder="Search by patient name"
            />
          </View>
          {approvedList.length > 0 || pendingTocsList.length > 0
            ? renderUI()
            : !filterData &&
              !searchEnabled && (
                <NotFoundOrError enableIcon={true} type={"noToCsFound"} />
              )}
          <NotFoundOrError
            enableIcon={checkConditionforoops()}
            type={"tocOopsNotFound"}
          />
        </>
      )}
      {tocLitError && <NotFoundOrError enableIcon={true} type={"error"} />}
    </ContainerView>
  );
};

export default EventHOC(TocsList);
