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
import { Feather } from "@expo/vector-icons";
import { deleteItem } from "../../libs/storage";

const Profile = () => {
  const [saveProfile, { isLoading: savingProfile }] =
    useUpdateProfileMutation();
  const {
    data: userData,
    isLoading: fetchingUser,
    isError,
    refetch,
  } = useSignedinUserQuery();

  if (fetchingUser)
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator />
      </View>
    );

  if (isError) return <Text>Error</Text>;
  if (!userData) return <Text>Error fetching user</Text>;
  const user = userData.user;

  const [name, setName] = useState<string>(user?.profile?.name || "");
  const [bio, setBio] = useState<string>(user?.profile?.bio || "");
  const [pronouns, setPronouns] = useState<string>(
    user?.profile?.pronouns || ""
  );
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
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

  const logout = async () => {
    await deleteItem("token");
    refetch();
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
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={{ color: colors.gray["200"] }}>Logout</Text>
        <Feather name="log-out" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ justifyContent: "center", width: "100%", height: "100%" }}>
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
          style={styles.button}
          onPress={() => (savingProfile ? null : handleSave())}
        >
          {savingProfile ? (
            <ActivityIndicator style={{ alignSelf: "center" }} color="white" />
          ) : (
            <Text style={styles.btnText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
    backgroundColor: "white",
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
  logout: {
    alignSelf: "flex-end",
    flexDirection: "row",
    width: 80,
    justifyContent: "space-between",
  },
});

export default Profile;
