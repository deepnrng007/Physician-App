import { ViewStyle } from "react-native";

export type props = {
  navigationTitle: string | undefined;
  isFilterRequired?: boolean;
  onPressFilterIcon?: () => void;
  isFilterApplied?: boolean;
  RightIcon?: any;
  style?: ViewStyle;
  navigateTo?: string;
  rightIcontestID?: string;
  isBackRequired?: boolean;
  customGoBack?: string | null;
};
