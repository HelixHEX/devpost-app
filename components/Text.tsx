import { Text as RNText, TextProps, StyleSheet } from "react-native";

type Props = TextProps & {
  children: React.ReactNode;
};

const Text = ({ children, ...props }: Props) => {
  return (
    <RNText style={[styles.text, props.style]} >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Athiti-Bold",
  },
});

export default Text;
