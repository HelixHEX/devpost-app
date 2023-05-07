import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

//screens
import Signin from "../screens/auth/Signin";
import Signup from "../screens/auth/Signup";
import Feed from "../screens/app/Feed";

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Feed" component={Feed} />
        ) : (
          <>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
