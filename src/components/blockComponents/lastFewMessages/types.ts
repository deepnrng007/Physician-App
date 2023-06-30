import { ViewStyle } from "react-native";

export type LastFewMessagesProps = {
  style?: ViewStyle;
  list: any[];
  emptyStateIcon?: any;
  emptyStateTitle?: string;
  emptyStateMssage?: string;
  emptyIcon: any;
  onPress: any;
  accessibilityLabel: string;
  testID: string;
  navigateToMessageList: any;
  limit: number;
  countValue: number;
};
