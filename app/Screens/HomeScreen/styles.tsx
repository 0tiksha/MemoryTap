import { StyleSheet } from "react-native";
import Metrics from "../../Constants/Metrics";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    btnContainer: {
        width: Metrics.sWidth * 0.8,
        marginTop: 100,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        alignItems: "center"
    },
    countContainer: {
        alignItems: "center"
    }
});