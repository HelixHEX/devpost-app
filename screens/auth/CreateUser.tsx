import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  rtkApi,
  useCheckEmailQuery,
  useCheckUsernameQuery,
} from "../../api/rtkApi";
import { colors } from "../../libs/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import Text from "../../components/Text";
import { useDispatch } from "react-redux";
type Props = NativeStackScreenProps<StackParamList, "CreateUser">;

const Signup = ({ route, navigation }: Props) => {
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    signupError: "",
  });
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();

  //DATA FETCHING
  const {
    data: validUsername,
    isError: validUsernameError,
    isLoading: validatingUsername,
  } = useCheckUsernameQuery(username, { skip: username.length === 0 });
  const {
    data: validEmail,
    isError: validEmailError,
    isLoading: validatingEmail,
  } = useCheckEmailQuery(email, { skip: email.length === 0 });

  if (validEmailError) return <Text>Error checking Email</Text>;
  if (validUsernameError) return <Text>Error checking Username</Text>;

  useEffect(() => {
    if (validEmail) {
      if (!validEmail.success) {
        setError({ ...error, email: "Email already in use" });
      } else {
        setError({ ...error, email: "" });
      }
    }
  }, [validEmail]);

  useEffect(() => {
    if (validUsername) {
      if (!validUsername.success) {
        setError({ ...error, username: "Username already in use" });
      } else if (username.includes("@")) {
        setError({
          ...error,
          username: "Username can't contain the '@'",
        });
      } else {
        setError({ ...error, username: "" });
      }
    }
  }, [validUsername]);

  const checkEmail = (email: string) => {
    setEmail(email);

    if (email.length > 0) {
      dispatch(rtkApi.util.invalidateTags(["CheckEmail"]));
    }
  };

  const checkUsername = (username: string) => {
    setUsername(username);

    if (username.length > 0) {
      if (username.includes("@")) {
        setError({
          ...error,
          username: "Username can't contain the '@'",
        });
      }
      dispatch(rtkApi.util.invalidateTags(["CheckUsername"]));
    }
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError({
        ...error,
        confirmPassword: "Passwords do not match",
      });
      return;
    } else if (
      error.email.length > 0 ||
      error.username.length > 0 ||
      error.password.length > 0 ||
      error.confirmPassword.length > 0
    ) {
      return;
    } else {
      navigation.navigate("CreateProfile", {
        username,
        email,
        password,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "80%", height: "90%" }}>
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Logo theme="light" fontSize={35} />
        </View>
        <View style={{ height: "100%", justifyContent: "center" }}>
          <Text style={styles.header}>Signup</Text>
          <Input
            label={"Username"}
            value={username}
            onChangeText={checkUsername}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
            error={error.username}
          />
          <Input
            label={"Email"}
            value={email}
            onChangeText={checkEmail}
            style={{
              backgroundColor: colors.gray["200"],
              color: "white",
              fontWeight: "bold",
            }}
            error={error.email}
          />
          <Input
            label={"Password"}
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: colors.gray["200"],
              color: "white",
              fontWeight: "bold",
            }}
            otherProps={{ secureTextEntry: true }}
          />
          <Input
            label={"Confirm Password"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={{
              backgroundColor: colors.gray["200"],
              color: "white",
              fontWeight: "bold",
            }}
            otherProps={{ secureTextEntry: true }}
            error={error.confirmPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              validatingEmail || validatingUsername ? null : handleSignup()
            }
          >
            {validatingEmail || validatingUsername ? (
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                color="white"
              />
            ) : (
              <Text style={styles.btnText}>Signup</Text>
            )}
          </TouchableOpacity>
          <Text style={{ marginTop: 8, color: "white" }}>
            {error.signupError}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text
              style={{ marginTop: 8, fontSize: 18, color: colors.gray["200"] }}
            >
              Already a user?{" "}
              <Text style={{ color: colors.purple["300"] }}>Signin</Text>
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
    backgroundColor: "#f1f1f1",
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

export default Signup;
