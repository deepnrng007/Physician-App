import { ViewStyle } from "react-native";

export type HorizontalFormListProps = {
  title: string;
  list: any[];
  style?: ViewStyle;
  Icon?: any;
  count: number;
  emptyStateTitle?: string;
  emptyStateMssage?: string;
  EmptyStateIcon?: any;
  screenName?: string;
  onPress?: any;
  searchEnabled?: boolean;
  emptyIcon?: any;
  testID?: string;
  accessibilityLabel?: string;
};

export type renderItemProps = {
  item: {
    name: string;
    patientName: string;
    navigatorName: string;
    date: Date;
    problem: string;
  };
};
