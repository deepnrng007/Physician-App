import { langVar, translate } from "../../enums";
import {
  getAgeFromDateOfBirthday,
  getDateFormat,
  getLocaleTime,
} from "../../utils/utils";

export const formatTocApprovedList = (list: any) => {
  return list.map((item: any) => {
    const {
      PatientName,
      PatientGender,
      PatientDOB,
      TocCreatedDate,
      ProcedureDate,
      ProcedureDescription,
      NavigatorFirstName,
      NavigatorLastName,
      revision,
      IntakeID,
    } = item;
    return {
      patientName: PatientName,
      IntakeID,
      date: revision[0].CreatedDateTime,
      trackStatus: "Approved",
      navigatorName: `${NavigatorFirstName}, ${NavigatorLastName}`,
      details: `${PatientGender}, ${getAgeFromDateOfBirthday(
        PatientDOB
      )} Yrs, ${
        ProcedureDate
          ? translate.t(langVar.procedureDate) +
            ": " +
            getLocaleTime(ProcedureDate, "MM/DD/YYYY")
          : ""
      }`,
      problem: ProcedureDescription,
      revisedDetails: {
        revised: revision,
      },
    };
  });
};

export const formatPendingTocList = (list: any[]) => {
  return (
    list &&
    list.map((item: any) => {
      const {
        PatientName,
        PatientGender,
        PatientDOB,
        ProcedureDate,
        ProcedureDescription,
        NavigatorFirstName,
        NavigatorLastName,
        IntakeID,
      } = item;

      return {
        totalCount: list.length,
        patientName: PatientName,
        IntakeID,
        date: ProcedureDate ? getDateFormat(ProcedureDate, "MM/DD/YYYY") : null,
        problem: ProcedureDescription,
        navigatorName: `${NavigatorLastName}, ${NavigatorFirstName}`,
        trackStatus: "Pending",
        details: `${PatientGender}, ${getAgeFromDateOfBirthday(
          PatientDOB
        )} Yrs, ${
          ProcedureDate
            ? translate.t(langVar.procedureDate) +
              ": " +
              getLocaleTime(ProcedureDate, "MM/DD/YYYY")
            : ""
        }`,
      };
    })
  );
};

export const getToCRequest = (data: any) => {
  let params = {};
  if (data?.dateRange && data?.dateRange?.length > 0) {
    params = {
      ...params,
      dischargeStartDate: data?.dateRange[0],
      dischargeEndDate: data?.dateRange[1],
    };
  }
  if (data?.endDate && data?.endDate?.length > 0) {
    params = {
      ...params,
      procedureEndDateFrom: data?.endDate[0],
      procedureEndDateTo: data?.endDate[1],
    };
  }
  params = {
    ...params,
    status: data?.location.label,
  };

  return params;
};
