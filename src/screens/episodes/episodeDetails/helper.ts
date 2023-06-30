import {
  getAgeFromDateOfBirthday,
  getDateFormatForDay,
} from "./../../../utils/utils";
import { langVar, translate } from "../../../enums";
import moment from "moment";
import { postRequest } from "../../../connectivity/axiosClient";
import { FETCH_EPISODE_LIST_URL } from "../../../connectivity/endpoints";
import Config from "react-native-config";
import logger from "../../../utils/logger";

export const getEpisodeDetailList = (episodeDetail: any) => {
  const {
    PatientFirstName,
    PatientLastName,
    PatientDOB,
    EpisodeName,
    IntakeSurgeryDate,
    IntakeSurgerySide,
    IntakeSurgerySite,
  } = episodeDetail;
  const age = getAgeFromDateOfBirthday(PatientDOB);
  return [
    {
      title: translate.t(langVar.patientName),
      value: `${PatientFirstName} ${PatientLastName}`,
    },
    { title: translate.t(langVar.age), value: `${age} years` },
    {
      title: translate.t(langVar.procedure),
      value:
        EpisodeName +
        (IntakeSurgeryDate
          ? ` (${getDateFormatForDay(IntakeSurgeryDate, "MM/DD/YY")})`
          : ""),
    },
    {
      title: translate.t(langVar.laterality),
      value:
        IntakeSurgerySide === "N/A"
          ? "None"
          : `${IntakeSurgerySide} ${IntakeSurgerySite}`,
    },
    {
      title: translate.t(langVar.days90),
      value: `${
        IntakeSurgeryDate ? getDateAfter90Days(IntakeSurgeryDate) : "-"
      }`,
    },
  ];
};

const getDateAfter90Days = (date: string) => {
  return moment(moment(date).add(90, "days")).format("MM/DD/YY");
};

export const fetchPatientDetails = async (intakeID: any) => {
  const res = await postRequest(
    `${FETCH_EPISODE_LIST_URL}`,
    { intakeID: parseInt(intakeID) },
    Config.GENERALURL as any
  );
  return res.data;
};
