import { View, ViewStyle } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppButton,
  AppText,
  ContactMessageCall,
  ContainerView,
  Underline,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import { styles } from "./styles";
import PatientDetail from "../../../components/blockComponents/tocForm/patientDetail";
import NavigatorDetail from "../../../components/blockComponents/tocForm/navigatorDetail";
import NavigatorNoteCard from "../../../components/blockComponents/tocForm/navigatorNoteCard";
import CautionCard from "../../../components/blockComponents/tocForm/cautionCard";
import SlideToApprove from "../../../components/blockComponents/tocForm/slideToApprove";
import HomeServiceCheckBox from "../../../components/blockComponents/tocForm/homeServiceCheckBox";
import SurgeryDetailView from "../../../components/blockComponents/tocForm/surgeryDetailView";
import LocationHeaderTitle from "../../../components/blockComponents/tocForm/locationsHeaderTitle";
import LocationSelectionContainer from "../../../components/blockComponents/tocForm/locationSelectionContainer";
import AddChangeLocationButton from "../../../components/blockComponents/tocForm/addChangeLocationButton";
import ToCApproveBottomSheet from "../../../components/blockComponents/tocForm/tocApproveBottomSheet";
import ApproveDialog from "../../../components/blockComponents/tocForm/approveDialogContainer";
import { langVar, screenNames, translate } from "../../../enums";
import DropDownModal from "../../../components/blockComponents/dropdownModal";
import { batch } from "react-redux";
import RightSidePanelChat from "../../../components/blockComponents/rightSidePanelChat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { fetchTOCDetail } from "../../../redux/apis/fetchTOCDetail";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import { getAgeFromDateOfBirthday, getDateFormat } from "../../../utils/utils";
import LocationInfoContainer from "../../../components/blockComponents/tocForm/locationInfoContainer";
import { fetchProviderList } from "../../../redux/apis/fetchProviderList";
import { initiateCall } from "../../../redux/apis/voiceCall";
import { global } from "../../../global";
import { conversationType } from "../../../enums/constants";
import { updateTOC } from "../../../redux/apis/updateTOC";
import { useFocusEffect } from "@react-navigation/core";
import { setApprovedList } from "../../../redux/slicers/tocDetailSlice";
import ModalLoader from "../../../components/blockComponents/modalLoader";
import ErrorModal from "../../../components/blockComponents/ErrorModal";
import { clearVoiceCallAction } from "../../../redux/slicers/voiceCallSlice";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import NotesDescription from "../../../components/blockComponents/notesDescription";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.ALLCHATMESSAGES
>;

const TocDetail = ({ navigation, route }: Props | any) => {
  const dispatch = useAppDispatch();
  const { intakeID, updateLoader, count, cameFrom } = route?.params as any;
  const refRBSheet = useRef<any>();
  const [showDialog, setShowDialog] = useState(false);
  const [showChangeLocation, setChangeLocation] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isApproved, setApproved] = useState(false);
  const [isshowDropdown, setshowDropdown] = useState(false);
  const [locationKey, setLocationKey] = useState("");
  const [openRightPanel, setopenRightPanel] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tocDetailInfo, setTocDetailInfo] = useState<any | null>(null);
  const [homeWithoutService, setHomeWithoutService] = useState(false);
  const [selectedItems, setselectedItems] = useState<any>([]);
  const [transitionOfCareItems, setTransitionOfCareItems] = useState<any>([]);
  const {
    configData: { LocationTypes },
  } = useAppSelector((state) => state.configData);
  const [chatUserID, setChatUserID] = useState<any>(null);
  const [acuteLOS, setAcuteLOS] = useState(0);
  const [approveDisable, setApproveDisable] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);
  const { tocListDetails, tocListLoading, tocLitError } = useAppSelector(
    (state) => state.tocList
  );
  const [callError, setCallError] = useState(false);
  const [navigatorPhoneNumber, setNavigatorPhoneNumber] = useState("");
  const { tocDetailResp, providerListResp, userProfileData } = useAppSelector(
    (state) => {
      return {
        tocDetailResp: state.tocDetail,
        providerListResp: state.providerList,
        userProfileData: state.profileData,
      };
    }
  );
  const { voiceCallLoading, voiceCallError } = useAppSelector(
    (state) => state.voiceCall
  );
  const { ToCDetailError, ToCDetailLoading, tocDetail, approvedList } =
    tocDetailResp;
  const { providerError, providerLoading, providerList } = providerListResp;
  const {
    profileData: { PhoneNumber },
  } = userProfileData;
  const [showNotes, setShowNotes] = useState(false);

  useFocusEffect(
    useCallback(() => {
      global.NOTIFICATIONNAVIGATEPENDING = null;
      if (!global.ISPREVIOUSTOCAPPROVED)
        global.PREVIOUSSCREEN = screenNames.TOCDETAILS as any;
      dispatch(clearVoiceCallAction());
      dispatch(fetchTOCDetail(intakeID));
      dispatch(fetchProviderList());
      mapLocationType();

      if (updateLoader) setTimeout(() => updateLoader(), 500);
      return () => {
        onPressCancel();
      };
    }, [])
  );

  useEffect(() => {
    if (voiceCallError) {
      setCallError(true);
    } else {
      setCallError(false);
    }
  }, [voiceCallError]);

  useEffect(() => {
    if (tocDetail && tocDetail.length > 0) {
      const tocInfo = tocDetail[0];
      if (
        tocInfo.TransitionOfCareItems &&
        tocInfo.TransitionOfCareItems.length === 0
      ) {
        setHomeWithoutService(true);
      }
      if (
        tocInfo.TransitionOfCareItems &&
        tocInfo.TransitionOfCareItems.length === 0 &&
        tocInfo.AnticipatedAcuteLOS === 0
      ) {
        setChecked(true);
      }
      mapData(tocInfo);
      setApproved(tocInfo.ReviewedWithProvider);
      setTocDetailInfo(tocInfo);
    }
  }, [tocDetail]);

  useEffect(() => {
    if (!transitionOfCareItems.length && !homeWithoutService) {
      setApproveDisable(true);
    } else {
      setApproveDisable(false);
    }
  }, [transitionOfCareItems, homeWithoutService]);

  const mapLocationType = () => {
    const tempLocationArray: any = [];
    if (LocationTypes && LocationTypes.length > 0) {
      LocationTypes.forEach((locationType: any) => {
        const locationSelectedObj = {
          name: locationType.DisplayName,
          selectedValue: null,
        };
        tempLocationArray.push(locationSelectedObj);
      });
      setselectedItems(tempLocationArray);
    }
  };
  const mapData = (tocinfo: any) => {
    if (tocinfo.TransitionOfCareItems.length) {
      setHomeWithoutService(false);
      setChecked(false);
      setAcuteLOS(tocinfo.AnticipatedAcuteLOS);
      if (
        tocinfo.TransitionOfCareItems.length === 1 &&
        tocinfo.TransitionOfCareItems[0].PACTypeID === 1040
      ) {
        setHomeWithoutService(true);
        setChecked(true);
        setTransitionOfCareItems([]);
        return [];
      }
      setNavigatorPhoneNumber(
        tocinfo.Intake && tocinfo.Intake.PrimaryCareManagerPhone
      );

      setTransitionOfCareItems(tocinfo.TransitionOfCareItems);
      tocinfo.TransitionOfCareItems.forEach((element: any) => {
        const index = selectedItems.findIndex(
          (x: any) => x.name === element.PACTypeName
        );
        if (index === -1) return [];
        selectedItems[index].targetLOS = element && element.TargetLOS;
        selectedItems[index].selectedValue = {
          ID: element.ProviderID,
          ProviderName: element && element.ProviderName,
        };
      });
    }
  };

  const validateBeforeApprove = () => {
    let error = "";
    if (!homeWithoutService) {
      if (!transitionOfCareItems.length) {
        error += "select atleast locations or homewithout service";
      }
      if (transitionOfCareItems.length) {
        transitionOfCareItems.forEach((element: any, index: any) => {
          if (!element.ProviderID) {
            element.error = "Provider id error";
            error += "Provider id error";
          }
          if (element && (!element.TargetLOS || element.TargetLOS === "0")) {
            error += "Provider LOS should not 0";
          }
        });
      }
    }
    if (acuteLOS <= 0 || acuteLOS > 50) {
      error += "acuteLOS should be between 1 to 50";
    }
    return error;
  };

  const onSwipeLeft = () => {
    if (!validateBeforeApprove()) {
      refRBSheet.current.open();
    }
  };

  const onPressCancel = () => {
    if (refRBSheet.current) refRBSheet.current.close();
  };

  const createRequestBody = () => {
    let homeWithoutServiceObj = null;
    if (homeWithoutService) {
      homeWithoutServiceObj = {
        PACTypeName: "Home w/No services",
        ProviderName: "",
        ProviderID: 0,
        TargetLOS: 0,
      };
    }

    const requestBody = {
      id: tocDetailInfo.ID,
      approved: true,
      notePhysician: "",
      anticipatedAcuteLOS: acuteLOS,
      transitionOfCareItems: homeWithoutService
        ? [homeWithoutServiceObj]
        : transitionOfCareItems,
    };
    return requestBody;
  };

  const onPressApprove = async () => {
    refRBSheet.current.close();
    setTimeout(() => {
      setupdateLoading(true);
    }, 500);
    const requestBody = createRequestBody();
    const responseUpdateTOC: any = await updateTOC(requestBody);
    if (responseUpdateTOC.IsValid) {
      dispatch(setApprovedList([...approvedList, tocDetailInfo.IntakeID]));
      setTimeout(() => {
        setupdateLoading(false);
      }, 500);
      setTimeout(() => {
        setShowDialog(true);
      }, 500);
    } else {
      setTimeout(() => {
        setupdateLoading(false);
      }, 500);
      //TODO: SHOWERROR update not successful
    }
  };
  const closeDialog = () => {
    setShowDialog(false);
  };

  const onApproveNext = () => {
    setShowDialog(false);
    const { Pending = [], Approved = [] } = tocListDetails.ToCList;
    const pendingList = Pending.filter(
      (element: any) => !approvedList.includes(element.IntakeID)
    );
    const nextRecord = pendingList[0];
    if (nextRecord) {
      global.ISPREVIOUSTOCAPPROVED = true;
      setTimeout(() => {
        navigation.replace(screenNames.TOCDETAILS, {
          intakeID: nextRecord.IntakeID,
          count: pendingList.length,
          updateLoader,
        });
      }, 300);
    } else {
      setTimeout(() => {
        navigation.navigate(screenNames.TOCSLIST);
      }, 300);
      dispatch(setApprovedList([]));
    }
  };

  const onGoHome = () => {
    setShowDialog(false);
    dispatch(setApprovedList([]));
    setTimeout(() => navigation.navigate(screenNames.HOME), 300);
  };

  const onChangeLocation = () => {
    !isApproved && !isChecked && setChangeLocation(!showChangeLocation);
  };

  const onHomeServiceCheck = () => {
    !isApproved && setChecked(!isChecked);
    setHomeWithoutService(!isChecked);
  };

  const showDropDown = (key: string) => {
    batch(() => {
      setLocationKey(key);
      setshowDropdown(!isshowDropdown);
    });
  };

  const onItemSelection = (item: any) => {
    setshowDropdown(!isshowDropdown);
    const index = selectedItems.findIndex((x: any) => x.name === item.key);
    selectedItems[index].selectedValue = item.item ? item.item : null;
    const selectedItem = selectedItems[index].selectedValue;
    const transitionCareItemObj = {
      PACTypeName: selectedItems[index].name,
      ProviderName: selectedItem && selectedItem.ProviderName,
      ProviderID: selectedItem && selectedItem.ID,
    };

    const itemIndex = transitionOfCareItems.findIndex(
      (x: any) => x.PACTypeName === item.key
    );
    if (itemIndex === -1 && !transitionCareItemObj.ProviderName) {
      return;
    }
    if (itemIndex === -1)
      setTransitionOfCareItems([
        ...transitionOfCareItems,
        transitionCareItemObj,
      ]);
    else {
      const transitionOfCareItemsCopy = [...transitionOfCareItems];
      const transitionCareItemObjCopy = transitionOfCareItems[itemIndex];
      if (
        transitionCareItemObj.ProviderName ||
        transitionCareItemObjCopy.TargetLOS
      ) {
        const transitionOfCareItemsCopy = [...transitionOfCareItems];
        transitionOfCareItemsCopy[itemIndex] = {
          ...transitionCareItemObjCopy,
          ...transitionCareItemObj,
        };
        setTransitionOfCareItems(transitionOfCareItemsCopy);
      } else {
        transitionOfCareItemsCopy.splice(itemIndex, 1);
        setTransitionOfCareItems(transitionOfCareItemsCopy);
      }
    }

    console.log(selectedItems);
  };

  const onPressMessage = (id: string) => {
    setChatUserID(id);
    setopenRightPanel(true);
  };

  const onCloseChatPanel = () => {
    setopenRightPanel(false);
  };

  const onPressNavigatorCall = (navigatorNumber: any) => {
    const navigatorID =
      tocDetailInfo &&
      tocDetailInfo.Intake &&
      tocDetailInfo.Intake.NavigatorUserId;
    dispatch(
      initiateCall({
        callerTo: PhoneNumber,
        recipientTo: navigatorNumber,
        participantId: navigatorID,
      })
    );
  };

  const onChangeAcuteLoS = (value: string) => {
    setAcuteLOS(Number(value));
  };

  const showNotesDescription = () => {
    setShowNotes(true);
  };

  const onChangelocationDays = (pacTypeName: string, days: string) => {
    const itemIndex = transitionOfCareItems.findIndex(
      (x: any) => x.PACTypeName === pacTypeName
    );
    const transitionCareItemObj = {
      PACTypeName: pacTypeName,
      TargetLOS: days,
    };
    if (itemIndex === -1)
      setTransitionOfCareItems([
        ...transitionOfCareItems,
        transitionCareItemObj,
      ]);
    else {
      const transitionOfCareItemsCopy = [...transitionOfCareItems];
      const transitionCareItemObjCopy = transitionOfCareItems[itemIndex];
      if (days !== "" || transitionCareItemObjCopy.ProviderName) {
        transitionOfCareItemsCopy[itemIndex] = {
          ...transitionCareItemObjCopy,
          ...transitionCareItemObj,
        };
        setTransitionOfCareItems(transitionOfCareItemsCopy);
      } else {
        transitionOfCareItemsCopy.splice(itemIndex, 1);
        setTransitionOfCareItems(transitionOfCareItemsCopy);
      }
    }
    //sorting compare with locationType
  };

  const getsortedLocations = () => {
    let transitionCare = [];
    transitionCare = transitionOfCareItems
      .slice()
      .sort(
        (a: any, b: any) =>
          LocationTypes.findIndex((x: any) => x.DisplayName === a.PACTypeName) -
          LocationTypes.findIndex((x: any) => x.DisplayName === b.PACTypeName)
      );
    return transitionCare;
  };

  const renderLocationSelection = () => {
    if (homeWithoutService) {
      return null;
    }

    if (!showChangeLocation) {
      if (transitionOfCareItems && transitionOfCareItems.length)
        return getsortedLocations().map((transitionOfCareItem: any) => {
          return (
            <LocationSelectionContainer
              key={transitionOfCareItem.PACTypeName}
              location={transitionOfCareItem.PACTypeName}
              defaultDays={transitionOfCareItem.TargetLOS}
              isDisabled={isChecked || isApproved}
              showDropDown={() =>
                showDropDown(transitionOfCareItem.PACTypeName)
              }
              selectedItems={selectedItems}
              onChangeDays={(days: string) =>
                onChangelocationDays(transitionOfCareItem.PACTypeName, days)
              }
            />
          );
        });
      else return null;
    } else {
      return LocationTypes.map((locationType: any) => {
        return (
          <LocationSelectionContainer
            key={locationType.DisplayName}
            location={locationType.DisplayName}
            isDisabled={isChecked || isApproved}
            showDropDown={() => showDropDown(locationType.DisplayName)}
            selectedItems={selectedItems}
            onChangeDays={(days: string) =>
              onChangelocationDays(locationType.DisplayName, days)
            }
          />
        );
      });
    }
  };

  const renderLocationHeader = () => {
    if (
      (!homeWithoutService && transitionOfCareItems.length) ||
      (!homeWithoutService && showChangeLocation)
    ) {
      return (
        <LocationHeaderTitle
          location={translate.t(langVar.location)}
          locationName={translate.t(langVar.locationName)}
          type={translate.t(langVar.los)}
          isDisabled={isChecked}
          isApproved={tocDetailInfo.ReviewedWithProvider}
        />
      );
    }
  };
  const renderLocationInformation = () => {
    if (
      tocDetailInfo.TransitionOfCareItems &&
      tocDetailInfo.TransitionOfCareItems.length > 0
    ) {
      return tocDetailInfo.TransitionOfCareItems.map(
        (transitionOfCareItem: any) => {
          const {
            PACTypeName,
            ProviderName = "",
            TargetLOS,
          } = transitionOfCareItem;
          return (
            !homeWithoutService && (
              <LocationInfoContainer
                key={PACTypeName}
                location={PACTypeName}
                locationName={ProviderName}
                locationDays={TargetLOS}
              />
            )
          );
        }
      );
    }
  };

  const renderAddChangeButton = () => {
    if (!tocDetailInfo.ReviewedWithProvider && !homeWithoutService) {
      return (
        <AddChangeLocationButton
          isShowLocation={showChangeLocation}
          onPressChange={onChangeLocation}
          isDisabled={isChecked || isApproved}
        />
      );
    }
  };

  const renderHomeWithoutService = () => {
    if (isApproved && !homeWithoutService) {
      return null;
    }
    if (isApproved && homeWithoutService) {
      return (
        <HomeServiceCheckBox
          isChecked={true}
          onCheck={onHomeServiceCheck}
          isApproved={tocDetailInfo.ReviewedWithProvider}
        />
      );
    } else {
      return (
        <HomeServiceCheckBox
          isChecked={isChecked}
          onCheck={onHomeServiceCheck}
          isApproved={tocDetailInfo.ReviewedWithProvider}
        />
      );
    }
  };
  const renderPatientDetail = () => {
    /* Patients detail */
    return (
      <PatientDetail
        name={`${tocDetailInfo.Patient.FirstName} ${tocDetailInfo.Patient.LastName}`}
        age={`${getAgeFromDateOfBirthday(tocDetailInfo.Patient.DOB)}`}
        gender={tocDetailInfo.Patient.Gender}
      />
    );
  };

  const renderNavigatorDetail = () => {
    return (
      <>
        {tocDetailInfo.Intake && (
          <NavigatorDetail
            navigatorName={tocDetailInfo.Intake.PrimaryCareManagerName}
          />
        )}
        {tocDetailInfo.NoteCareManager !== "" && (
          <NavigatorNoteCard
            date={tocDetailInfo.SentToDischargePlannerDate}
            noteDescription={tocDetailInfo.NoteCareManager}
            onNotePress={showNotesDescription}
          />
        )}
        <ContactMessageCall
          callerNumber={PhoneNumber && navigatorPhoneNumber}
          onPressCall={onPressNavigatorCall}
          onPressMessage={onPressMessage}
          title={translate.t(langVar.contactNavigator)}
          messageID={
            tocDetailInfo &&
            tocDetailInfo.Intake &&
            tocDetailInfo.Intake.NavigatorUserId
          }
          callTestID={"TOCNavigatorCall"}
          messageTestID={"TOCNavigatorMessage"}
        />
      </>
    );
  };

  const renderSurgeryDetail = () => {
    return (
      <>
        <AppText style={styles.tocPlanText}>
          {translate.t(langVar.tocPlan)}
        </AppText>

        <SurgeryDetailView
          defaultDays={tocDetailInfo.AnticipatedAcuteLOS}
          surgeryName={
            tocDetailInfo.Intake && tocDetailInfo.Intake.Episode.LongName
          }
          surgeryHospitalName={
            tocDetailInfo.Facility && tocDetailInfo.Facility.ProviderName
              ? tocDetailInfo.Facility.ProviderName
              : "Surgery site info not available"
          }
          isDisabled={false}
          isApproved={tocDetailInfo.ReviewedWithProvider}
          onChangeAcuteLoS={onChangeAcuteLoS}
        />
      </>
    );
  };

  const renderTOCApproveButton = () => {
    if (
      !ToCDetailLoading &&
      !ToCDetailError &&
      tocDetailInfo &&
      !tocDetailInfo.ReviewedWithProvider
    ) {
      return (
        <SlideToApprove onSwipeLeft={onSwipeLeft} isDisable={approveDisable} />
      );
    }
  };

  const renderRightPanel = () => {
    {
      return (
        openRightPanel &&
        chatUserID && (
          <RightSidePanelChat
            convoType={`${conversationType.TOC} - ${tocDetailInfo.Patient.FirstName} ${tocDetailInfo.Patient.LastName}`}
            visible={openRightPanel}
            onDismiss={onCloseChatPanel}
            oppositeUserId={chatUserID}
            patientDetails={{
              patientName: `${tocDetailInfo.Patient.LastName} ${tocDetailInfo.Patient.FirstName}`,
              procedureName:
                tocDetailInfo.Intake && tocDetailInfo.Intake.Episode.LongName,
              procudureDate: getDateFormat(
                tocDetailInfo.Intake && tocDetailInfo.Intake.SurgeryDate,
                "MM/DD/YYYY"
              ),
            }}
          />
        )
      );
    }
  };

  const renderBottomSheet = () => {
    return (
      <ToCApproveBottomSheet
        refRBSheet={refRBSheet}
        onPressCancel={onPressCancel}
        onPressApprove={onPressApprove}
      />
    );
  };

  const renderNotesModal = () => {
    return (
      <NotesDescription
        notes={tocDetailInfo && tocDetailInfo.NoteCareManager}
        isShow={showNotes}
        hideNotes={() => setShowNotes(!showNotes)}
        date={tocDetailInfo && tocDetailInfo.SentToDischargePlannerDate}
      />
    );
  };

  const renderDropDownModal = () => {
    return (
      <DropDownModal
        title={locationKey}
        locationKey={locationKey}
        isShow={isshowDropdown}
        showDropDown={() => setshowDropdown(!isshowDropdown)}
        onItemSelection={onItemSelection}
        locationData={providerList}
        selectedValue={selectedItems.find(
          (item: any) => item.name === locationKey
        )}
        error={providerError}
      />
    );
  };

  return (
    <ContainerView
      style={styles.container as ViewStyle}
      headerName={translate.t(langVar.tocDetailHeader)}
      hideStatusSpacer
      isBackRequired
      customGoBack={cameFrom}
    >
      <AvoidKeyboardComponent>
        <View style={{ flex: 1 }}>
          <ContainerView
            style={styles.container as ViewStyle}
            isScrollEnable
            loading={ToCDetailLoading || providerLoading}
            enableSafeArea={false}
          >
            {renderRightPanel()}

            {ToCDetailError ? (
              <View style={styles.loaderView}>
                <NotFoundOrError enableIcon={true} type={"error"} />
              </View>
            ) : (
              tocDetailInfo &&
              tocDetailInfo.Patient && (
                <AppButton style={styles.detailView}>
                  {renderPatientDetail()}
                  {renderNavigatorDetail()}
                  <Underline style={styles.underLine} />
                  {/* ToC Plan */}
                  {renderSurgeryDetail()}
                  {renderLocationHeader()}
                  {tocDetailInfo.ReviewedWithProvider
                    ? renderLocationInformation()
                    : renderLocationSelection()}
                  {renderAddChangeButton()}
                  {/* Checkbox */}
                  {renderHomeWithoutService()}
                  {/* Caution card */}
                  {!tocDetailInfo.ReviewedWithProvider && <CautionCard />}
                </AppButton>
              )
            )}
            <ApproveDialog
              onClose={closeDialog}
              onApproveNext={onApproveNext}
              onGoHome={onGoHome}
              visible={showDialog}
              pendingCount={count - 1}
              name={
                tocDetailInfo &&
                `${tocDetailInfo.Patient.FirstName} ${tocDetailInfo.Patient.LastName}`
              }
            />
            <ModalLoader
              isVisible={updateLoading || voiceCallLoading}
              textRequired={voiceCallLoading}
            />
            <ErrorModal
              isVisible={callError}
              currentContactName={
                tocDetailInfo && tocDetailInfo.Intake.PrimaryCareManagerName
              }
              onPress={() => {
                setCallError(!callError);
              }}
            />
          </ContainerView>
          {/* Slide Button */}
          {renderTOCApproveButton()}
          {renderBottomSheet()}
          {renderDropDownModal()}
          {renderNotesModal()}
        </View>
      </AvoidKeyboardComponent>
    </ContainerView>
  );
};

export default TocDetail;
