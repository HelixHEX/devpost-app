import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { AuthContext } from "../../contexts/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { deleteItem } from "../../libs/storage";
import { queryClient } from "../../api";

type Props = NativeStackScreenProps<StackParamList, "Feed">;

const Feed = ({ route, navigation }: Props) => {
  const { user } = useContext(AuthContext);
  
  const logout = async () => {
    await deleteItem('token');
    queryClient.invalidateQueries(['user']);
  }

  if (!user) return null;

  return (
    <View style={{ marginTop: 200 }}>
      <Text>{user!.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Feed