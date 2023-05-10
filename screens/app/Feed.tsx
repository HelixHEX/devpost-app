import { useContext, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteItem } from "../../libs/storage";
import { useFeedQuery, useSignedinUserQuery } from "../../api/rtkApi";
import { colors } from "../../libs/theme";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Text from "../../components/Text";
import { LinearGradient } from "expo-linear-gradient";
import Changelog from "../../components/Changelog";

type Props = BottomTabScreenProps<TabParamList, "Feed">;

const Feed = ({ route, navigation }: Props) => {
  const { user } = useContext(AuthContext);
  const {
    data: feedData,
    isError: feedError,
    isLoading: feedLoading,
    refetch: refetchFeed,
  } = useFeedQuery();
  const { refetch: refetchUser } = useSignedinUserQuery();

  useEffect(() => {
    refetchFeed();
  }, []);

  if (!user) return null;

  if (feedLoading) return <Text>Loading...</Text>;
  if (feedError) return <Text>Error</Text>;
  if (!feedData) return <Text>Error fetching feed</Text>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <LinearGradient
        start={[0.0, 0.0]}
        end={[1.0, 1.0]}
        style={styles.header}
        colors={["rgb(71, 98, 237)", "rgb(182, 194, 255)"]}
      >
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.heading}>Daily Feed</Text>
      </LinearGradient>
      <FlatList
        // style={{ backgroundColor: "red" }}
        data={feedData.feed}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <Changelog {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    backgroundColor: colors.purple["300"],
    paddingTop: 60,
    padding: 30,
  },
  heading: {
    color: "white",
    fontSize: 30,
  },
  date: {
    color: colors.gray["200"],
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Feed;
