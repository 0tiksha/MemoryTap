import { Metrics } from "@/app/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
  },
  container: {
    marginTop: 10,
  },
  createBtn: {
    marginTop: 50,
    width: Metrics.sWidth / 2,
    flex: 1,
    alignSelf: "center",
  },
});
export default styles;
