import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Metrics } from "../Constants";

type Props = {
  value: "string";
  placeholder: "stirng";
  changeValue: (value: string) => void;
};

/**
 *
 * @param onClick method to perform when clicked
 * @param label label to show
 * @returns
 */
export default function InputBox({ value, placeholder, changeValue }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={styles.input}
        onChangeText={(txt) => changeValue(txt)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.sWidth * 0.8,
    height: Metrics.sHeight * 0.2,
    backgroundColor: "pink",
  },
  input: {
    backgroundColor: "yellow",
  },
});
