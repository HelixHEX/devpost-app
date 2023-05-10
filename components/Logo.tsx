import { StyleSheet } from "react-native";
import { colors } from "../libs/theme";
import Text from "./Text";

interface Props {
  fontSize?: number;
  theme: "light" | "dark";
}
const Logo = ({ fontSize, theme="light" }: Props) => {
  return (
    <>
      {theme === "light" ? (
        <Text style={{ color: colors.purple['300'], fontWeight: "bold", fontSize }}>
          <Text style={{ color: colors.gray["100"] }}>{"<"}</Text>
          Devpost <Text style={{ color: colors.gray["100"] }}>{"/>"}</Text>
        </Text>
      ) : (
        <Text style={{ color: colors.gray['100'], fontWeight: "bold", fontSize }}>
          <Text style={{ color: 'white' }}>{"<"}</Text>
          Devpost <Text style={{ color: 'white' }}>{"/>"}</Text>
        </Text>
      )}
    </>
  );
};

export default Logo;
