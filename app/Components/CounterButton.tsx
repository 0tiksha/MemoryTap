import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../indexStyle";

type Props = {
  onClick: () => void;
  label: "add" | "remove";
};

/**
 *
 * @param onClick method to perform when clicked
 * @param label label to show
 * @returns
 */
export default function CounterButton({ onClick, label }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Ionicons name={label} size={32} color="green" />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
