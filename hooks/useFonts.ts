import * as Font from "expo-font";

const useFonts = async () =>
  await Font.loadAsync({
    "Athiti-Bold": require("../assets/fonts/Athiti/Athiti-Bold.ttf"),
    "Aithi-ExtraLight": require("../assets/fonts/Athiti/Athiti-ExtraLight.ttf"),
    "Aithi-Light": require("../assets/fonts/Athiti/Athiti-Light.ttf"),
    "Athiti-Medium": require("../assets/fonts/Athiti/Athiti-Medium.ttf"),
    "Athiti-Regular": require("../assets/fonts/Athiti/Athiti-Regular.ttf"),
    "Athiti-SemiBold": require("../assets/fonts/Athiti/Athiti-SemiBold.ttf"),
  });

export default useFonts;
