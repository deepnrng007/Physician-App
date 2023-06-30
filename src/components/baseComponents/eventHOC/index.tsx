import React, { useEffect, useState } from "react";
import { Keyboard, AppState } from "react-native";
import { isAndroid } from "../../../utils/utils";

const EventHOC = (Component: any) => {
  const Wrapper = (props: any) => {
    const [isKeyboardVisible, setIskeyboardVisible] = useState(false);
    const [appStateVisible, setAppStateVisible] = useState(true);

    useEffect(() => {
      let showSubscription: any = null;
      let hideSubscription: any = null;
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active") setAppStateVisible(true);
          else setAppStateVisible(false);
        }
      );

      if (isAndroid()) {
        showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
          setIskeyboardVisible(true);
        });
        hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
          setIskeyboardVisible(false);
        });
      } else {
        showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
          setIskeyboardVisible(true);
        });
        hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => {
          setIskeyboardVisible(false);
        });
      }

      return () => {
        if (showSubscription && hideSubscription && subscription) {
          showSubscription?.remove();
          hideSubscription?.remove();
          subscription.remove();
        }
      };
    }, []);

    return (
      <Component
        isAppInForground={appStateVisible}
        isKeyboardVisible={isKeyboardVisible}
        {...props}
      />
    );
  };
  return Wrapper;
};

export default EventHOC;
