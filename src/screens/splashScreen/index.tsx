import React from "react";
import LottieView from "lottie-react-native";
const SplashSreen = () => {
  return (
    <LottieView
      source={require("../../assets/animations/splashscreen.json")}
      autoPlay
      loop={false}
      resizeMode="cover"
    />
  );
};

export default SplashSreen;
