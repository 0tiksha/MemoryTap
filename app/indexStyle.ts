import { StyleSheet } from "react-native";
import Metrics from "./Constants/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btnContainer: {
    width: Metrics.sWidth * 0.8,
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    padding: 20,
  },
  button: {
    alignItems: "center",
  },
  countContainer: {
    alignItems: "center",
  },
});
