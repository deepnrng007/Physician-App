import { langVar, translate } from "../../../enums";
import { getLocaleTime } from "../../../utils/utils";

export const getMappedResponse = (offtrackList: any) => {
  if (!offtrackList) return [];

  return offtrackList.map((item: any) => {
    return {
      patientName: `${item.PatientFirstName} ${item.PatientLastName}`,
      problem: item.EpisodeName,
      date: item.IntakeSurgeryDate
        ? translate.t(langVar.procedureDate) +
          ": " +
          getLocaleTime(item.IntakeSurgeryDate, "MM/DD/YYYY")
        : "",
      navigatorName: item.NavigatorName,
      PatientFirstName: item.PatientFirstName,
      PatientLastName: item.PatientLastName,
      PatientDOB: item.PatientDOB,
      PatientPhoneCell: item.PatientPhoneCell,
      PatientPhoneHome: item.PatientPhoneHome,
      PatientPhoneWork: item.PatientPhoneWork,
      NavigatorName: item.NavigatorName,
      NavigatorPhone: item.NavigatorPhone,
      EpisodeName: item.EpisodeName,
      EpisodeID: item.EpisodeID,
      IntakeID: item.IntakeID,
      IntakeStatus: item.IntakeStatus,
      IntakeStatusID: item.IntakeStatusID,
      IntakeSurgeryDate: item.IntakeSurgeryDate,
      IntakeSurgerySide: item.IntakeSurgerySide,
      IntakeSurgerySite: item.IntakeSurgerySite,
      SurgeryLocationName: item.SurgeryLocationName,
      SurgeryLocationID: item.SurgeryLocationID,
      SurgeryLocationPhone: item.SurgeryLocationPhone,
      CurrentLocationName: item.CurrentLocationName,
      CurrentLocationID: item.CurrentLocationID,
      CurrentLocationType: item.CurrentLocationType,
      TrackStatus: item.TrackStatus,
      PatientUserId: item.PatientUserId,
      NavigatorUserId: item.NavigatorUserId,
    };
  });
};

export const getFilterRequest = (data: any) => {
  // const locationIDs = data.location.map((item: any) => item.id);
  const statusIDs = data.status.map((item: any) => item.ID);
  const locID = data.location.ID === -1 ? [] : [data.location.ID];
  const startDate = data.date[0] ? data.date[0] : "";
  const endDate = data.date[1] ? data.date[1] : "";
  return {
    locationID: locID,
    intakeStatusID: statusIDs,
    surgeryStartDate: startDate,
    surgeryEndDate: endDate,
  };
};
