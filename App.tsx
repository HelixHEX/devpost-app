import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import reduxStore from "./libs/store";

const App = () => {
  return (
    <>
      <Provider store={reduxStore}>
        <AuthProvider>
          <Navigation />
          <Toast />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
