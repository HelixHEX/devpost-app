import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getItem, setItem } from "../../libs/storage";
import { queryClient } from "../../api";
import { API_URL } from "@env";
import { useSignedinUserQuery, useSigninMutation } from "../../api/rtkApi";
import { colors } from "../../libs/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { useState } from "react";
import Logo from "../../components/Logo";
import Text from "../../components/Text";
type Props = NativeStackScreenProps<StackParamList, "Signin">;

const Signin = ({ route, navigation }: Props) => {
  const { refetch: refetchUser } = useSignedinUserQuery();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signin, {isLoading}] = useSigninMutation();

  const handleSignin = () => {
    if (username.length === 0 && password.length === 0) return;
    if (username.includes("@")) {
      signin({
        email: username,
        username: undefined,
        password,
      });
    } else {
      signin({
        email: undefined,
        username,
        password,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "80%", height: "90%" }}>
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Logo theme={"light"} fontSize={35} />
        </View>
        <View style={{ justifyContent: "center", height: "100%" }}>
          <Text style={styles.header}>Signin</Text>
          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
            otherProps={{ secureTextEntry: true }}
          />
          <TouchableOpacity style={styles.button} onPress={() => isLoading ? null : handleSignin()}>
            {isLoading ? (
              <ActivityIndicator style={{alignSelf: 'center'}} color="white" />
            ) : (
              <Text style={styles.btnText}>Signin</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CreateUser")}>
            <Text
              style={{ marginTop: 8, fontSize: 18, color: colors.gray["200"] }}
            >
              New user?{" "}
              <Text style={{ color: colors.purple["300"] }}>Signup</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: "30%",
    fontFamily: "Athiti-Regular",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.gray["200"],
  },
  button: {
    marginTop: 20,
    width: "100%",
    backgroundColor: colors.purple["300"],
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Signin;
