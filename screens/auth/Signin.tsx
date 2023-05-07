import { Text, TouchableOpacity, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getItem, setItem } from "../../libs/storage";
import { queryClient } from "../../api";

type Props = NativeStackScreenProps<StackParamList, "Signin">;

const Signin = ({ route, navigation }: Props) => {
  const signin = async () => {
    await setItem({
      key: "token",
      value:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImEiLCJlbWFpbCI6IkEiLCJwcm9maWxlSWQiOjEsInByb2ZpbGUiOnsiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMDdUMDM6MjQ6MzQuOTI3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMDdUMDM6MjQ6MzQuOTI3WiIsIm5hbWUiOiJFbGlhcyBXYW1idWd1IiwiYmlvIjoiSnVzdCB5b3VyIGF2ZXJhZ2UgZGV2IiwicHJvbm91bnMiOiJIZS9IaW0ifX0sImlhdCI6MTY4MzQyOTk1MX0.oPrb7BaByc9IlSgG7XarFyLt6Dju_22x2hoR08rXX9o",
    });
    const token = await getItem("token");
    queryClient.invalidateQueries(["user"]);
    // navigation.navigate("Signup");
  };
  return (
    <View style={{ marginTop: 200 }}>
      <Text>Signin Screen</Text>
      <TouchableOpacity onPress={signin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
