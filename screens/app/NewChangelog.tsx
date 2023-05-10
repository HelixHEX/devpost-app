import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { colors } from "../../libs/theme";
import Text from "../../components/Text";
import {
  useAddChangelogMutation,
  useAddProjectMutation,
  useProjectsQuery,
} from "../../api/rtkApi";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<TabParamList, "NewChangelog">;

const NewChangelog = ({ route, navigation }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [addProject] = useAddProjectMutation();
  const [addChangelog] = useAddChangelogMutation();
  const [currentTab, setCurrentTab] = useState<"NewProject" | "NewChangelog">(
    "NewProject"
  );
  const {
    data: projectsData,
    isLoading: fetchingProjects,
    isError: fetchingProjectsError,
    refetch: refetchProjects,
  } = useProjectsQuery("me");

  const toggleTab = (val: "NewProject" | "NewChangelog") => {
    setName("");
    setDescription("");
    setTitle("");
    setBody("");
    if (currentTab === "NewChangelog") {
      refetchProjects();
    }

    setCurrentTab(val);
    navigation.setOptions({
      title:  val === "NewProject" ? "New Project" : "New Changelog",
    });
  };

  useEffect(() => {
    refetchProjects();
  }, []);

  const handleAddProject = () => {
    if (!name || !description) return;
    addProject({ name, description });
  };

  const handleAddChangelog = () => {
    if (!title || !body) return;
    addChangelog({
      changelog: {
        title,
        body,
        projectName,
      },
      setTitle,
      setBody,
    });
  };

  if (!projectsData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={tab.container}>
        <TouchableOpacity
          onPress={() => toggleTab("NewProject")}
          style={[
            tab.option,
            {
              borderBottomColor:
                currentTab === "NewProject"
                  ? colors.purple["300"]
                  : colors.gray["50"],
              borderBottomWidth: currentTab === "NewProject" ? 2 : 0,
            },
          ]}
        >
          <Text
            style={[
              {
                color:
                  currentTab === "NewProject"
                    ? colors.purple["300"]
                    : colors.gray["50"],
              },
              tab.text,
            ]}
          >
            New Project
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTab("NewChangelog")}
          style={[
            tab.option,
            {
              borderBottomColor:
                currentTab === "NewChangelog" ? colors.purple["300"] : "none",
              borderBottomWidth: currentTab === "NewChangelog" ? 2 : 0,
            },
          ]}
        >
          <Text
            style={[
              {
                color:
                  currentTab === "NewChangelog"
                    ? colors.purple["300"]
                    : colors.gray["50"],
              },
              tab.text,
            ]}
          >
            New Changelog
          </Text>
        </TouchableOpacity>
      </View>
      {currentTab === "NewProject" ? (
        <View style={styles.form}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
          />
          <Input
            {...{ multiline: true }}
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddProject}>
            <Text style={styles.btnText}>Create Project</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          {fetchingProjects ? (
            <Text>Loading...</Text>
          ) : (
            <SelectList
              setSelected={setProjectName}
              data={projectsData.projects.map((project) => {
                return { key: project.id, value: project.name };
              })}
              arrowicon={
                <Feather name="chevron-down" color="white" size={24} />
              }
              search={false}
              dropdownItemStyles={{
                backgroundColor: colors.gray["200"],
              }}
              dropdownTextStyles={{
                color: "white",
              }}
              dropdownStyles={{
                backgroundColor: colors.gray["200"],
                borderRadius: 5,
                borderColor: colors.gray["200"],
              }}
              placeholder="Select a project"
              save="value"
              boxStyles={{
                backgroundColor: colors.gray["200"],
                borderRadius: 5,
                borderColor: colors.gray["200"],
              }}
              fontFamily="Athiti-Bold"
              inputStyles={{
                color: "white",
              }}
            />
          )}
          <Input
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
          />
          <Input
            {...{ multiline: true }}
            label="Description"
            value={body}
            onChangeText={setBody}
            style={{
              backgroundColor: colors.gray["200"],
              fontWeight: "bold",
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddChangelog}>
            <Text style={styles.btnText}>Add Changelog</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    padding: 30,
  },
  form: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
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

const tab = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  option: {
    width: 120,
  },
  text: {
    fontSize: 16,
  },
});

export default NewChangelog;
