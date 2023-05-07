import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { AppState, AppStateStatus, Platform, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { QueryClientProvider, onlineManager } from "@tanstack/react-query";
import { focusManager } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { queryClient } from "./api";
import Navigation from "./navigation";

onlineManager.setEventListener((setOnline) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    setOnline(state.isConnected as boolean);
  });

  return () => unsubscribe();
});

const Test = () => {
  const { user } = useContext(AuthContext);
  return (
    <View style={{ marginTop: 200 }}>
      <Text>{user ? user.username : "Not logged in"}</Text>
    </View>
  );
};

const App = () => {
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navigation />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
