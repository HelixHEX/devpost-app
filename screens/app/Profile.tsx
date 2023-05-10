import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../../components/Text";
import {
  useSignedinUserQuery,
  useUpdateProfileMutation,
} from "../../api/rtkApi";
import { colors, globalStyles } from "../../libs/theme";
import { useState } from "react";
import Input from "../../components/Input";

const Profile = () => {
  const [saveProfile, saveStatus] = useUpdateProfileMutation();
  const { data: userData, isLoading, isError } = useSignedinUserQuery();

  if (isLoading)
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator />
      </View>
    );

  if (isError) return <Text>Error</Text>;
  if (!userData) return <Text>Error fetching user</Text>;

  const user = userData.user;

  const [name, setName] = useState<string>(user!.profile!.name);
  const [bio, setBio] = useState<string>(user!.profile!.bio);
  const [pronouns, setPronouns] = useState<string>(user!.profile!.pronouns);
  const [username, setUsername] = useState<string>(user!.username);
  const [email, setEmail] = useState<string>(user!.email);
  const [error, setError] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleSave = () => {
    if (name.length === 0) {
      setError({ ...error, name: "Name is required" });
    } else if (username.length === 0) {
      setError({ ...error, username: "Username is required" });
    } else {
      saveProfile({
        name,
        bio,
        pronouns,
        username,
        email,
      });
    }
  };

  const checkName = (name: string) => {
    if (name.length === 0) {
      setError({ ...error, name: "Name is required" });
    } else {
      setError({ ...error, name: "" });
    }
    setName(name);
  };

  const checkEmail = (email: string) => {
    if (email.length === 0) {
      setError({ ...error, email: "Email is required" });
    } else {
      setError({ ...error, email: "" });
    }
    setEmail(email);
  };

  const checkUsername = (username: string) => {
    if (username.length === 0) {
      setError({ ...error, username: "Username is required" });
    } else {
      setError({ ...error, username: "" });
    }
    setUsername(username);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Name"
        value={name}
        onChangeText={checkName}
        style={{ backgroundColor: colors.gray["200"] }}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={checkEmail}
        style={{ backgroundColor: colors.gray["200"] }}
      />
      <Input
        label="Username"
        value={username}
        onChangeText={checkUsername}
        style={{ backgroundColor: colors.gray["200"] }}
      />
      <Input
        label="Bio"
        value={bio}
        onChangeText={setBio}
        style={{ backgroundColor: colors.gray["200"] }}
      />
      <Input
        label="Pronouns"
        value={pronouns}
        onChangeText={setPronouns}
        style={{ backgroundColor: colors.gray["200"] }}
      />
      <TouchableOpacity
        disabled={isLoading}
        style={styles.button}
        onPress={() => (saveStatus.isLoading ? null : handleSave())}
      >
        <Text style={styles.btnText}>
          {saveStatus.isLoading ? (
            <ActivityIndicator style={{ alignSelf: "center" }} color="white" />
          ) : (
            "Save Profile"
          )}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 30,
    backgroundColor: "white",

    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 30,
    fontFamily: "Athiti-Regular",
  },
  username: {
    marginTop: -14,
    fontSize: 20,
    fontFamily: "Athiti-Medium",
    color: colors.purple["300"],
  },
  email: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Athiti-Medium",
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

export default Profile;
