import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { colors } from "../libs/theme";
import { LinearGradient } from "expo-linear-gradient";

const ProjectCard = ({ name, profile, description }: Project) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgb(255,255,255)", "rgb(231, 231, 231)"]}
      >
        <Text style={styles.profileName}>{profile!.name}</Text>
        <Text style={styles.projectName}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 'auto',
    borderBottomColor: colors.purple["300"],
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  gradient: {
    minHeight: 150,
    height: 'auto',
    padding: 30,
    paddingBottom: 10,
    zIndex: 1
  },
  profileName: {
    color: colors.gray["200"],
    fontSize: 20,
  },
  projectName: {
    color: colors.purple["300"],
    fontSize: 30,
  },
  description: {
    color: colors.gray["100"],
    // marginTop: ,
  },
});

export default ProjectCard;
