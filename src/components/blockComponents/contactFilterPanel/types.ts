export type ContactFilterPanelProps = {
  visible: boolean;
  onDismiss: () => void;
  onPressApplyFilter: (contactType: string) => void;
  onPressClearFilter: () => void;
  contactTypes: any;
};
