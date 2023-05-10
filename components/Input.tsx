import { StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { colors } from "../libs/theme";

type Props = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
  error?: string;
  otherProps?: any;
  errorStyle?: any;
  label?: string;
  placeholderTextColor?: string;
};

const Input = ({
  style,
  placeholder,
  value,
  onChangeText,
  error,
  otherProps,
  errorStyle,
  label,
  placeholderTextColor,
}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...otherProps}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[{ ...style }, {color: style.color ? style.color : 'white'}, styles.input]}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.gray['100']}
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
