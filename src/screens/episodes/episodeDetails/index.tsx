import { useFocusEffect } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  AppText,
  ContactMessageCall,
  ContainerView,
  PatientsDetails,
  Underline,
  AppTitle,
  TransitionOfCare,
  AppButton,
  useAppDispatch,
  useAppSelector,
  Loader,
} from "../../../components";
import ErrorModal from "../../../components/blockComponents/ErrorModal";
import ModalLoader from "../../../components/blockComponents/modalLoader";
import RightSidePanelChat from "../../../components/blockComponents/rightSidePanelChat";
import { langVar, screenNames, translate } from "../../../enums";
import { conversationType, episodeTrackStatus } from "../../../enums/constants";
import { global } from "../../../global";
import { fetchTOCDetail } from "../../../redux/apis/fetchTOCDetail";
import { initiateCall } from "../../../redux/apis/voiceCall";
import { clearVoiceCallAction } from "../../../redux/slicers/voiceCallSlice";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import logger from "../../../utils/logger";
import { getDateFormat } from "../../../utils/utils";
import { fetchPatientDetails, getEpisodeDetailList } from "./helper";
import styles from "./styles";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.EPISODEDETAILS
>;

const EpisodeDetails = (props: Props) => {
  const transitionOfDays = [
    { label: "Acute Days", value: 0 },
    { label: "IRF Days", value: 0 },
    { label: "SNF Days", value: 0 },
    { label: "HH Visits", value: 0 },
    { label: "OPT Visits", value: 0 },
    { label: "M-PT Visits", value: 0 },
  ];
  const [openRightPanel, setopenRightPanel] = useState(false);
  const dispatch = useAppDispatch();
  const {
    patientData = {},
    updateLoader,
    intakeID,
    cameFrom,
  } = props.route?.params;
  const [episodeDetail, setepisodeDetail] = useState(patientData);
  const [tocDays, setTocDays] = useState(transitionOfDays);
  const [chatUserID, setChatUserID] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { navigation } = props;
  const { ToCDetailLoading, tocDetail } = useAppSelector(
    (state) => state.tocDetail
  );
  const {
    profileData: { PhoneNumber },
  } = useAppSelector((state) => state.profileData);
  const { voiceCallLoading, voiceCallError } = useAppSelector(
    (state) => state.voiceCall
  );
  const [callError, setCallError] = useState(false);
  const [contactName, setContactName] = useState("");

  const onPressViewTocForm = (intakeID: number) => {
    navigation.navigate(screenNames.TOCDETAILS, { intakeID: intakeID });
  };
  useEffect(() => {
    if (intakeID !== undefined) getEpisodeDetails(intakeID);
  }, [intakeID]);

  const getEpisodeDetails = async (intakeID: any) => {
    setLoading(true);
    try {
      const result: any = await fetchPatientDetails(intakeID);
      if (
        result &&
        result.offtrackPatients &&
        result.offtrackPatients.length > 0
      ) {
        const data = result.offtrackPatients[0];
        setLoading(false);
        setepisodeDetail(data);
      } else if (
        result &&
        result.ontrackPatients &&
        result.ontrackPatients.length > 0
      ) {
        const data = result.ontrackPatients[0];
        setLoading(false);
        setepisodeDetail(data);
      }
    } catch (err) {
      logger.log("error while fetching episode list with intake", err);
      setLoading(false);
    }
  };

  const onPressCall = (
    number: string,
    userName: string,
    contactType: string
  ) => {
    setContactName(userName);
    dispatch(
      initiateCall({
        callerTo: PhoneNumber,
        recipientTo: number,
        participantId:
          contactType === "Navigator"
            ? episodeDetail.NavigatorUserId
            : episodeDetail.PatientUserId,
      })
    );
  };
  const onPressMessage = (id: any) => {
    setChatUserID(id);
    setopenRightPanel(true);
  };
  const onCloseChatPanel = () => {
    setopenRightPanel(false);
  };
  useEffect(() => {
    if (voiceCallError) {
      setCallError(true);
    } else {
      setCallError(false);
    }
  }, [voiceCallError]);

  useFocusEffect(
    useCallback(() => {
      global.NOTIFICATIONNAVIGATEPENDING = null;
      dispatch(clearVoiceCallAction());
      if (
        episodeDetail.TrackStatus !== episodeTrackStatus.TOCNOTCREATED &&
        global.PREVIOUSSCREEN !== screenNames.TOCDETAILS
      ) {
        dispatch(fetchTOCDetail(episodeDetail.IntakeID));
      }
      if (updateLoader) setTimeout(() => updateLoader(), 500);
      global.PREVIOUSSCREEN = screenNames.EPISODEDETAILS as any;
    }, [])
  );

  const navigateToToc = () => {
    const intakeID = episodeDetail?.IntakeID;
    navigation.navigate(screenNames.TOCDETAILS, { intakeID });
  };
  useEffect(() => {
    if (tocDetail && tocDetail.length) {
      const tocInfo = tocDetail[0];
      setChatUserID(tocInfo.Patient.UserId);
      const tempTransitionDays = transitionOfDays;
      tempTransitionDays[0].value = tocInfo.AnticipatedAcuteLOS;
      if (tocDetail[0].TransitionOfCareItems.length) {
        tocInfo.TransitionOfCareItems.forEach((element: any) => {
          const index = tempTransitionDays.findIndex((x) =>
            x.label.includes(element.PACTypeName)
          );
          if (index >= 0) tempTransitionDays[index].value = element.TargetLOS;
        });
        setTocDays(tempTransitionDays);
      } else {
        setTocDays(tempTransitionDays);
      }
    }
  }, [tocDetail]);

  const renderCurrentLocation = () => {
    if (episodeDetail.CurrentLocationName) {
      return (
        <>
          <AppTitle titleName={translate.t(langVar.currentLocation)} />
          <AppText style={styles.locationDesc}>
            {episodeDetail.CurrentLocationName}
          </AppText>
          <Underline style={styles.underline1} />
        </>
      );
    }
  };
  const getPhoneNumber = () => {
    const preferedPhone = episodeDetail && episodeDetail.PatientPreferredPhone;

    if (preferedPhone === "HOME") {
      return episodeDetail.PatientPhoneHome;
    } else if (preferedPhone === "WORK") {
      return episodeDetail.PatientPhoneWork;
    } else {
      return episodeDetail.PatientPhoneCell;
    }
  };

  return (
    <ContainerView
      isBackRequired
      headerName={translate.t(langVar.episodeDetails)}
      hideStatusSpacer
      customGoBack={cameFrom}
      style={styles.container as ViewStyle}
      loading={ToCDetailLoading || loading}
    >
      {openRightPanel && chatUserID && (
        <RightSidePanelChat
          convoType={`${conversationType.EPISODE} - ${episodeDetail.PatientFirstName} ${episodeDetail.PatientLastName}`}
          visible={openRightPanel}
          onDismiss={onCloseChatPanel}
          oppositeUserId={chatUserID}
          patientDetails={{
            patientName: `${episodeDetail.PatientFirstName} ${episodeDetail.PatientLastName}`,
            procedureName: `${episodeDetail.EpisodeName}`,
            procudureDate: `${getDateFormat(episodeDetail.IntakeSurgeryDate)}`,
          }}
        />
      )}

      <ModalLoader isVisible={voiceCallLoading} />

      <ErrorModal
        isVisible={callError}
        currentContactName={contactName}
        onPress={() => {
          setCallError(!callError);
        }}
      />

      {ToCDetailLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <PatientsDetails
            style={styles.patientDetails as ViewStyle}
            list={getEpisodeDetailList(episodeDetail)}
            status={episodeDetail.TrackStatus}
          />
          {episodeDetail &&
            episodeDetail.TrackStatus === episodeTrackStatus.TOCPENDING && (
              <AppButton
                style={styles.reviewApprove as ViewStyle}
                onPress={navigateToToc}
              >
                <AppText style={styles.reviewLabel}>
                  {translate.t(langVar.reviewApprove)}
                </AppText>
              </AppButton>
            )}
          <Underline style={styles.underline} />
          {renderCurrentLocation()}
          <ContactMessageCall
            messageID={episodeDetail && episodeDetail.PatientUserId}
            callerNumber={PhoneNumber && getPhoneNumber()}
            title={translate.t(langVar.contactPatient)}
            onPressCall={(number: any) =>
              onPressCall(
                number,
                `${episodeDetail.PatientFirstName} ${episodeDetail.PatientLastName}`,
                "Patient"
              )
            }
            onPressMessage={onPressMessage}
            callTestID={"EpisodePatientCall"}
            messageTestID={"EpisodePatientMessage"}
          />
          <Underline style={styles.underline} />
          <ContactMessageCall
            messageID={episodeDetail && episodeDetail.NavigatorUserId}
            callerNumber={PhoneNumber && episodeDetail.NavigatorPhone}
            title={translate.t(langVar.contactNavigator)}
            onPressCall={(number: any) =>
              onPressCall(number, episodeDetail.navigatorName, "Navigator")
            }
            onPressMessage={onPressMessage}
            callTestID={"EpisodeNavigatorCall"}
            messageTestID={"EpisodeNavigatorMessage"}
          />
          {episodeDetail.TrackStatus !== episodeTrackStatus.TOCNOTCREATED && (
            <>
              <Underline style={styles.underline} />
              {tocDetail && tocDetail.length > 0 && (
                <TransitionOfCare list={tocDays} tocDetail={tocDetail[0]} />
              )}
              <AppButton
                onPress={() => onPressViewTocForm(episodeDetail.IntakeID)}
                style={styles.viewTocForm as ViewStyle}
              >
                <AppText style={styles.tocLabel}>
                  {translate.t(langVar.viewTOcForm)}
                </AppText>
              </AppButton>
            </>
          )}
        </ScrollView>
      )}
    </ContainerView>
  );
};

export default EpisodeDetails;
