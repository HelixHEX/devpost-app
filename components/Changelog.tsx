import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { colors } from "../libs/theme";
import ProjectCard from "./ProjectCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const Changelog = ({ project, title, body }: Changelog) => {
  return (
    <>
      <View style={styles.container}>
        <ProjectCard {...project!} />
        <View style={styles.changelog}>
          <View style={styles.row}>
            <Line title={title} body={body} />
          </View>
        </View>
      </View>
    </>
  );
};

const Line = ({ title, body }: { title: string; body: string }) => {
  return (
    <>
      <View>
        <View style={[styles.line, { height: 30 }]} />
        <View
          style={{
            flexDirection: "row",
            marginLeft: -6,
            marginTop: -8,
          }}
        >
          <View style={styles.circle} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: -8 }}>
          <View style={[styles.line, { height: '90%' }]} />
          <Text style={styles.body}>{body}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  changelog: {},
  line: {
    width: 1,
    backgroundColor: colors.gray["50"],
    zIndex: 0,
  },
  circle: {
    backgroundColor: "white",
    borderColor: colors.purple["300"],
    borderRadius: 100,
    borderWidth: 2,
    width: 13,
    height: 13,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  title: {
    color: colors.gray["100"],
    fontSize: 18,
    marginLeft: 20,
  },
  body: {
    marginTop: 20,
    color: colors.gray["200"],
    marginLeft: 23
  },
});

export default Changelog;
