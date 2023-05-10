import { StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { colors } from "../libs/theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
  error?: string;
  otherProps?: any;
  errorStyle?: any;
  label?: string;
};

const Input = ({
  style,
  value,
  onChangeText,
  error,
  otherProps,
  errorStyle,
  label,
}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...otherProps}
        value={value}
        onChangeText={onChangeText}
        style={[{ ...style }, {color: style && style.color ? style.color : 'white'}, styles.input]}
      />
      {error && (
        <Text
          style={[
            { ...errorStyle },
            { color: errorStyle ? errorStyle.color : "red" },
            styles.error,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 2,
    width: "100%",
    height: 48,
    padding: 10,
    borderRadius: 4,
  },
  error: {
    // color: colors.red['100'],
    marginTop: 2,
    marginBottom: 8,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8
  }
});

export default Input;
