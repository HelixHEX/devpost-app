import { createStackNavigator } from "@react-navigation/stack";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

//screens
import Signin from "../screens/auth/Signin";
import CreateUser from "../screens/auth/CreateUser";
import Feed from "../screens/app/Feed";
import CreateProfile from "../screens/auth/CreateProfile";
import NewChangelog from "../screens/app/NewChangelog";
import Profile from "../screens/app/Profile";
import { colors } from "../libs/theme";
import { navigationRef } from "./RootNavigation";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color = focused ? colors.purple["300"] : colors.gray["50"];
            return <Feather name="activity" size={24} color={color} />;
          },
        }}
        name="Feed"
        component={Feed}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color = focused ? colors.purple["300"] : colors.gray["50"];
            return <Feather name="plus" size={24} color={color} />;
          },
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "Athiti-Bold",
            color: colors.purple["300"],
          },
        }}
        name="NewChangelog"
        component={NewChangelog}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color = focused ? colors.purple["300"] : colors.gray["50"];
            return <Feather name="user" size={24} color={color} />;
          },
          headerShown: true,
          headerTitle: "Profile",
          headerTitleStyle: {
            fontFamily: "Athiti-Bold",
            color: colors.purple["300"],
          },
        }}
        
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  const { user } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    "Athiti-Bold": require("../assets/fonts/Athiti/Athiti-Bold.ttf"),
    "Athiti-ExtraLight": require("../assets/fonts/Athiti/Athiti-ExtraLight.ttf"),
    "Athiti-Light": require("../assets/fonts/Athiti/Athiti-Light.ttf"),
    "Athiti-Medium": require("../assets/fonts/Athiti/Athiti-Medium.ttf"),
    "Athiti-Regular": require("../assets/fonts/Athiti/Athiti-Regular.ttf"),
    "Athiti-SemiBold": require("../assets/fonts/Athiti/Athiti-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="App" component={TabNavigation} />
        ) : (
          <>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
