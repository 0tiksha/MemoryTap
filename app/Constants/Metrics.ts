import { Dimensions } from "react-native";

type MetricsType = {
  sWidth: number;
  sHeight: number;
};

const Metrics: MetricsType = {
  sWidth: Dimensions.get("screen").width,
  sHeight: Dimensions.get("screen").height,
};

export default Metrics;
