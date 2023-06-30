import { contactType } from "./../../../screens/contact/types";

export type bottomSheetProps = {
  currentContact: contactType;
  refRBSheet: any;
  onPressMessage: any;
  onPressCall: any;
  isCallDisable: boolean;
};
