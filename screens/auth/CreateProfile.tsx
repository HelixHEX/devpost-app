import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setItem } from "../../libs/storage";
import { useSignedinUserQuery, useSignupMutation } from "../../api/rtkApi";
import { colors } from "../../libs/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Text from "../../components/Text";
type Props = NativeStackScreenProps<StackParamList, "CreateProfile">;

const CreateProfile = ({ route, navigation }: Props) => {
  const [error, setError] = useState({
    name: "",
    signupError: "",
  });
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");
  const [signup, { isLoading }] = useSignupMutation();

  const handleSignup = async () => {
    if (name.length === 0) {
      setError({ ...error, name: "Name is required" });
    } else {
      signup({
        email: route.params.email,
        username: route.params.username,
        password: route.params.password,
        name,
        bio,
        pronouns,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ width: "80%", height: "75%", justifyContent: "space-between" }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 18, color: colors.gray["100"] }}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.header}>Setup Profile</Text>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            style={{ backgroundColor: colors.gray["200"] }}
            error={error.name}
            errorStyle={{ color: "red" }}
          />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            style={{ backgroundColor: colors.gray["200"] }}
            otherProps={{ multiline: true }}
          />
          <Input
            label="Pronouns"
            value={pronouns}
            onChangeText={setPronouns}
            style={{ backgroundColor: colors.gray["200"] }}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            {isLoading ? (
              <ActivityIndicator
                color="white"
                style={{ alignSelf: "center" }}
              />
            ) : (
              <Text style={styles.btnText}>Create Profile</Text>
            )}
          </TouchableOpacity>
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
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: "30%",
    fontFamily: "Athiti-Regular",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.gray["100"],
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

export default CreateProfile;
